import React from 'react';

export default function ProjectCard({ title, category, year }) {
  return (
    <div className="flex flex-col gap-4 cursor-pointer group w-full">
      <div className="relative w-full overflow-hidden bg-white/5 aspect-[4/3] rounded-sm">
        {/* Placeholder for image */}
        <div className="absolute inset-0 bg-neutral-800 transition-transform duration-700 group-hover:scale-105" />
        
        {/* Overlay effect */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
      </div>
      
      <div className="flex justify-between items-start pt-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-3xl font-normal text-white group-hover:text-white/80 transition-colors">
            {title}
          </h3>
          <span className="text-sm font-medium tracking-widest text-white/50 uppercase">
            {category}
          </span>
        </div>
        <div className="px-3 py-1 border border-white/20 rounded-full">
           <span className="text-xs text-white/60">{year}</span>
        </div>
      </div>
    </div>
  );
}
