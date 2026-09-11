import Image from "next/image";

export const socialPlatforms = ["TikTok", "Instagram", "Facebook", "YouTube", "Snapchat"];

export default function PlatformLogo({ name }: { name: string }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center">
      <Image src={`/platforms/${name.toLowerCase()}.svg`} alt="" width={22} height={22} />
    </span>
  );
}
