import Link from "next/link";
import { ImageMedia } from "../Media/ImageMedia";

export default function CaseStudyCard({ title, categories, meta, slug }) {
  return (
    <Link className="flex flex-col gap-5" href={slug}>
      <div className="flex flex-col gap-4">
        <h4 className="font-[450]">
          {title}
        </h4>
        <div className="flex flex-wrap gap-2">
          {
            categories.map((category, i) => (
              <div key={i} className="text-[13px] px-4 py-[6px] bg-[#F6F4F1] rounded-full">
                <p>
                  {category.title}
                </p>
              </div>
            ))
          }
        </div>
      </div>
      <div className="w-full h-[300px] relative">
        <ImageMedia fill resource={meta.image} imgClassName="object-cover rounded-[12px]" />
      </div>
    </Link>
  )
}