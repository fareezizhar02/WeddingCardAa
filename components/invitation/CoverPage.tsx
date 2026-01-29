'use client'

import Image from 'next/image';

export default function CoverPage() {
    return (
        <div className="absolute inset-0">
                <Image
                  src="/images/CP.png"
                  alt="Wedding Background"
                  fill
                  className="object-cover"
                  priority
                  quality={100}
                />
                
                {/* Subtle overlay for readability */}
                <div className="absolute inset-0 bg-white/10" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15" />
              </div>
    );

}