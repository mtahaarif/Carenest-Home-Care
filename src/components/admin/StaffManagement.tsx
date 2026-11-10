"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Copy, UserPlus } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getSupabase } from "@/lib/supabase";

type Role = "staff" | "admin";

export function StaffManagement() {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState<Role>("staff");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [origin, setOrigin] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- window is only available after mount
    setOrigin(window.location.origin);
  }, []);

  const handleAddStaff = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId.trim()) {
      toast({ title: "User ID Required", description: "Please enter the user ID.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await getSupabase().from("user_roles").insert({ user_id: userId.trim(), role });
      if (error) {
        if (error.code === "23505") toast({ title: "Already Added", description: "This user already has this role.", variant: "destructive" });
        else if (error.code === "23503")
          toast({ title: "User Not Found", description: "This user ID does not exist. Make sure they signed up first.", variant: "destructive" });
        else throw error;
      } else {
        toast({ title: "Staff Added!", description: `User has been granted ${role} access. They may need to log out and back in.` });
        setUserId("");
      }
    } catch (error) {
      console.error("Error adding staff:", error);
      toast({ title: "Error", description: "Failed to add staff member.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyAuthUrl = () => {
    navigator.clipboard.writeText(`${window.location.origin}/auth`);
    toast({ title: "Copied!", description: "Auth URL copied to clipboard" });
  };

  return (
    <div className="bg-card rounded-xl shadow-card p-6 space-y-6">
      <div>
        <h3 className="text-lg font-display font-semibold text-foreground mb-2">Add Staff Member</h3>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            <strong>Step 1:</strong> Have them sign up at:
          </p>
          <div className="flex items-center gap-2">
            <code className="bg-muted px-2 py-1 rounded text-xs flex-1 overflow-hidden">{origin}/auth</code>
            <Button variant="outline" size="sm" onClick={copyAuthUrl}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <p>
            <strong>Step 2:</strong> Get their User ID from the backend (Auth → Users)
          </p>
          <p>
            <strong>Step 3:</strong> Enter the ID below to grant access
          </p>
        </div>
      </div>

      <form onSubmit={handleAddStaff} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 space-y-2">
          <Label htmlFor="staff-user-id">User ID</Label>
          <Input
            id="staff-user-id"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="e.g., a1b2c3d4-e5f6-7890-abcd-ef1234567890"
            required
          />
        </div>
        <div className="w-full sm:w-40 space-y-2">
          <Label>Role</Label>
          <Select value={role} onValueChange={(value) => setRole(value as Role)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="staff">Staff</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button type="submit" variant="hero" disabled={isSubmitting}>
            <UserPlus className="w-4 h-4 mr-2" />
            {isSubmitting ? "Adding..." : "Add"}
          </Button>
        </div>
      </form>
    </div>
  );
}
