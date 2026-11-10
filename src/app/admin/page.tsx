"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Briefcase, LogOut, RefreshCw, Settings, Users } from "@/components/icons";
import { StaffManagement } from "@/components/admin/StaffManagement";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { getSupabase } from "@/lib/supabase";

interface PatientInquiry {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  patient_name: string | null;
  status: string;
}

interface CareerApplication {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  status: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  scheduled: "bg-purple-100 text-purple-800",
  closed: "bg-gray-100 text-gray-800",
  reviewing: "bg-yellow-100 text-yellow-800",
  interview: "bg-purple-100 text-purple-800",
  hired: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export default function AdminPage() {
  const { user, isLoading, isAdmin, signOut } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<PatientInquiry[]>([]);
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const fetchData = useCallback(async () => {
    setLoadingData(true);
    const supabase = getSupabase();
    const [inquiriesRes, applicationsRes] = await Promise.all([
      supabase.from("patient_inquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("career_applications").select("*").order("created_at", { ascending: false }),
    ]);
    if (inquiriesRes.data) setInquiries(inquiriesRes.data as PatientInquiry[]);
    if (applicationsRes.data) setApplications(applicationsRes.data as CareerApplication[]);
    setLoadingData(false);
  }, []);

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth");
  }, [user, isLoading, router]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- loads dashboard data once the admin session is known
    if (user && isAdmin) void fetchData();
  }, [user, isAdmin, fetchData]);

  const updateInquiryStatus = async (id: string, status: string) => {
    const { error } = await getSupabase().from("patient_inquiries").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    } else {
      setInquiries((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
      toast({ title: "Updated", description: "Status updated successfully" });
    }
  };

  const updateApplicationStatus = async (id: string, status: string) => {
    const { error } = await getSupabase().from("career_applications").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    } else {
      setApplications((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
      toast({ title: "Updated", description: "Status updated successfully" });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You don&apos;t have permission to access this page. Please contact an administrator to request access.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Button variant="hero" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-display font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-6">
          <Button variant="outline" onClick={fetchData} disabled={loadingData}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loadingData ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <Tabs defaultValue="inquiries" className="space-y-6">
          <TabsList className="bg-card">
            <TabsTrigger value="inquiries" className="gap-2">
              <Users className="w-4 h-4" />
              Patient Inquiries ({inquiries.length})
            </TabsTrigger>
            <TabsTrigger value="applications" className="gap-2">
              <Briefcase className="w-4 h-4" />
              Career Applications ({applications.length})
            </TabsTrigger>
            <TabsTrigger value="staff" className="gap-2">
              <Settings className="w-4 h-4" />
              Staff
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries">
            <div className="bg-card rounded-xl shadow-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No inquiries yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    inquiries.map((inquiry) => (
                      <TableRow key={inquiry.id}>
                        <TableCell className="text-sm">{format(new Date(inquiry.created_at), "MMM d, yyyy")}</TableCell>
                        <TableCell className="font-medium">
                          {inquiry.first_name} {inquiry.last_name}
                        </TableCell>
                        <TableCell>{inquiry.email}</TableCell>
                        <TableCell>{inquiry.phone || "-"}</TableCell>
                        <TableCell>{inquiry.patient_name || "-"}</TableCell>
                        <TableCell>
                          <Select value={inquiry.status} onValueChange={(value) => updateInquiryStatus(inquiry.id, value)}>
                            <SelectTrigger className="w-32">
                              <SelectValue>
                                <Badge className={statusColors[inquiry.status]}>{inquiry.status}</Badge>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="scheduled">Scheduled</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <div className="bg-card rounded-xl shadow-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>DOB</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No applications yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    applications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="text-sm">{format(new Date(app.created_at), "MMM d, yyyy")}</TableCell>
                        <TableCell className="font-medium">{app.full_name}</TableCell>
                        <TableCell>{app.email}</TableCell>
                        <TableCell>{app.phone}</TableCell>
                        <TableCell>{format(new Date(app.date_of_birth), "MMM d, yyyy")}</TableCell>
                        <TableCell>
                          <Select value={app.status} onValueChange={(value) => updateApplicationStatus(app.id, value)}>
                            <SelectTrigger className="w-32">
                              <SelectValue>
                                <Badge className={statusColors[app.status]}>{app.status}</Badge>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="reviewing">Reviewing</SelectItem>
                              <SelectItem value="interview">Interview</SelectItem>
                              <SelectItem value="hired">Hired</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="staff">
            <StaffManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
