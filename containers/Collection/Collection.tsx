"use client";
import { useState } from "react";
import Layout from "@/components/Layout";
import { Copy, CopyCheck, Images } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CollectionItem {
  id: number;
  model: string;
  plainPrompt: string;
  generatedPrompt: string;
  imageUrl: string | null;
}

export default function Collection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const collections: CollectionItem[] = [
    {
      id: 1,
      model: "Gemini 2.5 Pro",
      plainPrompt:
        "anime image with helmet for profile avatar make it colorful two tone",
      generatedPrompt:
        "An anime-style portrait of a character wearing a futuristic helmet, designed as a profile avatar. Use a bold two-tone color palette (for example electric cyan and magenta). The helmet should be glossy with a reflective visor and subtle tech detailing. The character is shown in a tight head-and-shoulders crop with a slight three-quarter turn. Lighting is dynamic and vibrant, with strong highlights on the helmet and visor. Background is minimal—either a smooth gradient or a solid color that complements the two tones. Style: crisp line art, clean cel shading, high detail, anime-inspired. Mood: futuristic and energetic. Output: square aspect ratio (1:1) suitable for avatars, resolution 1024x1024 or higher.",
      imageUrl:
        "https://cdn.discordapp.com/attachments/1083645157238390845/1435446322231771339/Gemini_Generated_Image_e7zz02e7zz02e7zz.png?ex=690df950&is=690ca7d0&hm=5fa0306d16b37a37217502cc5983ad2ca4df17892f95445872d2b32576a80460",
    },
    {
      id: 2,
      model: "Gemini 2.5 Pro",
      plainPrompt:
        "foto saya berada ditengah penyebrangan shibuya (shibuya crossing) dengan menatap kamera ke atas, baju saya jas hitam dan celana hitam. tema gelap dark seperti mendung, jangan merubah postur tubuh dan gaya muka.",
      generatedPrompt:
        "Subjek adalah diri saya, berdiri tepat di tengah penyebrangan Shibuya Crossing, Tokyo, Jepang. Saya mengenakan jas hitam dan celana hitam. Postur tegak, ekspresi wajah netral, mata menatap ke atas menuju kamera. Suasana gelap, mendung, nuansa noir. Gaya: fotorealistik dengan sentuhan sinematik, kontras tinggi, palet warna dingin. Komposisi: subjek berada di tengah, fokus tajam pada subjek; latar belakang kota terlihat tetapi agak blur, dengan garis penyebrangan (zebra crossing) tetap terlihat. Sudut kamera: sedikit rendah (kamera berada di bawah subjek, mengarah ke atas) untuk menonjolkan subjek. Instruksi khusus: jangan mengubah postur tubuh maupun ekspresi wajah persis seperti deskripsi. Resolusi tinggi, rasio aspek 16:9.",
      imageUrl:
        "https://cdn.discordapp.com/attachments/1083645157238390845/1435559486717952122/Gemini_Generated_Image_k2uipk2uipk2uipk.png?ex=690db9f5&is=690c6875&hm=59c6240db7adc762ad70ee2a32bab8417a702676f45369e2a5b777a495288b51&",
    },
  ];

  return (
    <Layout>
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center py-6 px-4 mt-12 lg:mt-16">
        <h1 className="text-white font-bold text-center text-3xl lg:text-4xl mb-6">
          Generated Prompt Collection
        </h1>

        <div className="text-white border border-glass-border bg-glass-background px-6 py-2 w-fit rounded-full text-[11px] md:text-xs lg:text-xs backdrop-blur-md flex items-center justify-center">
          <Images className="mr-2" size={16} />
          <span>
            <b>Showcase</b> your prompt here.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6 w-full max-w-[1600px] mt-6">
          {collections.map((item) => (
            <div
              key={item.id}
              className="relative text-white border border-glass-border bg-glass-background p-3 rounded-lg backdrop-blur-md flex flex-col"
            >
              <span className="absolute top-2 right-2 bg-[#8A00C4]/90 text-white text-xs font-semibold px-2 py-1 rounded-md z-10">
                {item.model}
              </span>
              <div className="w-full aspect-square bg-white rounded-lg mb-3 overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt="Generated"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}
              </div>
              <div className="mb-3">
                <h3 className="text-base font-semibold mb-1">Plain Prompt</h3>
                <p className="text-xs text-gray-300 line-clamp-2">
                  {item.plainPrompt}
                </p>
              </div>
              <div className="flex-1 mb-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-semibold">Generated Prompt</h3>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-xs text-white px-2 py-1 rounded transition-colors duration-200"
                    onClick={() =>
                      copyToClipboard(item.generatedPrompt, `gen-${item.id}`)
                    }
                  >
                    {copiedId === `gen-${item.id}` ? (
                      <CopyCheck size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-300 line-clamp-4">
                  {item.generatedPrompt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
