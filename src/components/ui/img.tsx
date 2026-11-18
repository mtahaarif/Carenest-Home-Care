import type { ComponentProps, CSSProperties } from "react";
import { preload as preloadResource } from "react-dom";
import type { ImageAsset } from "@/lib/image-manifest";

/** `srcset` string for an asset's pre-generated WebP variants. */
export const srcSetOf = (asset: ImageAsset) => asset.srcSet.map(([w, url]) => `${url} ${w}w`).join(", ");

interface ImgProps extends Omit<ComponentProps<"img">, "src" | "srcSet" | "width" | "height" | "placeholder"> {
  src: ImageAsset;
  alt: string;
  /** Rendered width hint for `srcset` selection. Defaults to the `width` prop (or intrinsic width) in px. */
  sizes?: string;
  /** Override the width/height attributes (intrinsic size by default; CSS still controls the rendered size). */
  width?: number;
  height?: number;
  /** Load immediately at high priority and emit a <link rel="preload"> (use for the LCP image only). */
  preload?: boolean;
  /** Blurred preview painted behind the image until it loads (photos only). */
  placeholder?: "blur" | "empty";
  /**
   * Width of the plain `src` fallback. Browsers pick from `srcset`; only clients that ignore it
   * (crawlers, link-preview scrapers, audit tools) download `src`, so it shouldn't be the largest variant.
   * Defaults to 2× a fixed pixel `sizes` (e.g. the logo), otherwise 828px.
   */
  fallbackWidth?: number;
}

/**
 * Responsive image backed by the pre-generated WebP variants from `scripts/optimize-images.mjs`.
 * The files are plain static assets with immutable caching: no server-side encoding at request
 * time, and every variant is encoded once, straight from the high-quality master.
 */
export function Img({
  src: asset,
  alt,
  sizes,
  width,
  height,
  preload = false,
  placeholder = "blur",
  fallbackWidth,
  loading,
  fetchPriority,
  decoding = "async",
  style,
  ...rest
}: ImgProps) {
  const srcSet = srcSetOf(asset);
  const resolvedSizes = sizes ?? `${width ?? asset.width}px`;
  const fixedPx = /^(\d+(?:\.\d+)?)px$/.exec(resolvedSizes.trim());
  const minFallback = fallbackWidth ?? (fixedPx ? Math.ceil(Number(fixedPx[1]) * 2) : 828);
  const src = (asset.srcSet.find(([w]) => w >= minFallback) ?? asset.srcSet[asset.srcSet.length - 1])[1];

  if (preload) {
    preloadResource(src, { as: "image", imageSrcSet: srcSet, imageSizes: resolvedSizes, fetchPriority: "high" });
  }

  const blurStyle: CSSProperties | undefined =
    placeholder === "blur" && asset.blur
      ? { backgroundImage: `url("${asset.blur}")`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }
      : undefined;

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={resolvedSizes}
      alt={alt}
      width={width ?? asset.width}
      height={height ?? asset.height}
      loading={loading ?? (preload ? "eager" : "lazy")}
      fetchPriority={fetchPriority ?? (preload ? "high" : undefined)}
      decoding={decoding}
      style={blurStyle ? { ...blurStyle, ...style } : style}
      {...rest}
    />
  );
}
