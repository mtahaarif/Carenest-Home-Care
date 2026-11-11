import { getImageProps, type ImageProps } from "next/image";
import { preload as preloadResource } from "react-dom";

interface ImgProps extends Omit<ImageProps, "priority"> {
  /**
   * Width of the plain `src` fallback. Browsers pick from `srcset`; only clients that ignore it
   * (crawlers, link-preview scrapers, audit tools) download `src`, so it shouldn't be the largest
   * variant next/image would otherwise use.
   */
  fallbackWidth?: number;
}

/**
 * Drop-in replacement for next/image: same optimisation (AVIF/WebP, srcset, lazy-loading, explicit
 * dimensions) with a lighter default quality and a modest `src` fallback.
 */
export function Img({ fallbackWidth = 828, preload = false, quality = 70, loading, fetchPriority, ...rest }: ImgProps) {
  const { props } = getImageProps({ ...rest, quality, loading: loading ?? (preload ? "eager" : undefined), fetchPriority: fetchPriority ?? (preload ? "high" : undefined) });

  let src = props.src;
  if (props.srcSet && / \d+w/.test(props.srcSet)) {
    const candidates = props.srcSet.split(", ").map((entry) => {
      const [url, descriptor] = entry.trim().split(" ");
      return { url, width: parseInt(descriptor, 10) };
    });
    src = (candidates.find((c) => c.width >= fallbackWidth) ?? candidates[candidates.length - 1]).url;
  }

  if (preload) {
    preloadResource(src, { as: "image", imageSrcSet: props.srcSet, imageSizes: props.sizes, fetchPriority: "high" });
  }

  // eslint-disable-next-line jsx-a11y/alt-text -- alt is always provided through `rest` (required by ImageProps)
  return <img {...props} src={src} />;
}
