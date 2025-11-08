"use client";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Copy, CopyCheck, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Loading from "@/components/Loading";
import CustomModal from "@/components/CustomModal";
import CollectionModal from "./CollectionModal";

interface CollectionItem {
  id: number;
  ai_model: string;
  plain_prompt: string;
  generated_prompt: string;
  result: string | null;
}

export default function Collection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [collectionData, setCollectionData] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const copyToClipboard = async (text: string, id: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  useEffect(() => {
    const getCollectionData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/get-collection");

        setCollectionData(response.data.data.result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getCollectionData();
  }, []);

  return (
    <Layout>
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center py-6 px-4 mt-12 lg:mt-16">
        <h1 className="text-white font-bold text-center text-3xl lg:text-4xl mb-6">
          Generated Prompt Collection
        </h1>

        <div
          className="text-white border border-glass-border bg-glass-background px-6 py-2 w-fit rounded-full text-[11px] md:text-xs lg:text-xs backdrop-blur-md flex items-center justify-center cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          <Images className="mr-2" size={16} />
          <span>
            <b>Showcase</b> your prompt here.
          </span>
        </div>

        {loading && <Loading text="Loading Data" />}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6 w-full max-w-[1600px] mt-6">
          {collectionData &&
            collectionData.map((item) => (
              <div
                key={item.id}
                className="relative text-white border border-glass-border bg-glass-background p-3 rounded-lg backdrop-blur-md flex flex-col"
              >
                <span className="absolute top-2 right-2 bg-[#8A00C4]/90 text-white text-xs font-semibold px-2 py-1 rounded-md z-10">
                  {item.ai_model}
                </span>
                <div className="w-full aspect-square bg-white rounded-lg mb-3 overflow-hidden">
                  {item.result ? (
                    <img
                      src={item.result}
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
                    {item.plain_prompt}
                  </p>
                </div>
                <div className="flex-1 mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-semibold">
                      Generated Prompt
                    </h3>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-xs text-white px-2 py-1 rounded transition-colors duration-200"
                      onClick={() =>
                        copyToClipboard(item.generated_prompt, `gen-${item.id}`)
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
                    {item.generated_prompt}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {openModal && (
        <CustomModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          title="Showcase Your Prompt"
          description="Your prompt will show up once it’s approved. Go ahead and send your request!"
        >
          <CollectionModal />
        </CustomModal>
      )}
    </Layout>
  );
}
