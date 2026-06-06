import { Chip } from "@heroui/react";
import { Users,DollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";

const FeaturedCard = ({ course }) => {
  const {
    _id,
    image,
    name,
    description,
    floor,
    seatCapacity,
    hourlyRate,
    amenities = [],
  } = course;
 
  const shortDescription =
    description?.length > 100 ? description.slice(0, 100) + "..." : description;
 
  return (
    <div className="group flex flex-col bg-white rounded-4xl border border-slate-200  transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full">
   
      <div
        style={{
          borderTopLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
          position: "relative",
          height: "192px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Image
          src={
            image ||
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600"
          }
          alt="Course Image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 right-3">
          <Chip
            color="primary"
            variant="solid"
            size="sm"
            className="font-bold shadow-lg shadow-blue-600/20"
          >
            {floor}
          </Chip>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col grow gap-3">
        <Link href={`/all_rooms/${_id}`}>
          <h3 className="text-lg font-bold leading-tight line-clamp-2 hover:text-blue-600 transition-colors">
            {name}
          </h3>
        </Link>

        <p className="text-sm text-slate-500 leading-relaxed">
          {shortDescription || "No description available."}
        </p>

        <div className="flex items-center gap-4 text-sm text-slate-600">
          <span className="flex items-center gap-1 font-semibold text-blue-600">
            <DollarSign className="w-4 h-4" />
            {hourlyRate ? `${hourlyRate}/hr` : "N/A"}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4 text-slate-400" />
            {seatCapacity ? `${seatCapacity} people` : "N/A"}
          </span>
        </div>

       
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {amenities.slice(0, 3).map((amenity) => (
              <Chip key={amenity} size="sm" variant="flat" color="default">
                {amenity}
              </Chip>
            ))}
            {amenities.length > 3 && (
              <Chip size="sm" variant="flat" color="default">
                +{amenities.length - 3} more
              </Chip>
            )}
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-slate-100">
          <Link href={`/all_rooms/${_id}`} className="w-full">
            <Button
              color="primary"
              variant="flat"
              className="w-full font-bold rounded-xl"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
