import Image from "next/image";
import Link from "next/link";

type ImageCardProps = {
  imageSrc: string;
  altDescription: string;
  hrefTarget: string;
  userName: string;
  onClick: () => void;
};

export const ImageCard = ({
  imageSrc,
  altDescription,
  hrefTarget,
  userName,
  onClick,
}: ImageCardProps) => {
  return (
    <div
      className="group relative w-full cursor-pointer overflow-hidden rounded-sm border bg-muted transition hover:opacity-75"
      onClick={onClick}
    >
      <Image
        fill
        loading="lazy"
        src={imageSrc}
        alt={altDescription}
        className="object-cover"
      />
      <Link
        className="absolute bottom-0 left-0 w-full truncate bg-black/50 p-1 text-left text-[10px] text-white opacity-0 hover:underline group-hover:opacity-100"
        href={hrefTarget}
        target="_blank"
      >
        {userName}
      </Link>
    </div>
  );
};
