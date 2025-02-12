// components/tabs/WebpagesTab.tsx
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Webpage } from "@/types";

interface WebpagesTabProps {
  webpages: Webpage[];
  onPageClick: (page: Webpage) => Promise<string>;
}

export const WebpagesTab = ({ webpages, onPageClick }: WebpagesTabProps) => {
  const [selectedPage, setSelectedPage] = useState<Webpage | null>(null);
  const [pageContent, setPageContent] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePageClick = async (page: Webpage) => {
    setSelectedPage(page);
    setIsModalOpen(true);
    const content = await onPageClick(page);
    setPageContent(content);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Loaded Webpages</h3>
      {webpages.length > 0 ? (
        <ul className="space-y-3">
          {webpages.map((page) => (
            <li
              key={page._id}
              className="p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition"
              onClick={() => handlePageClick(page)}
            >
              <p className="text-gray-300">{page.filename}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No webpages available.</p>
      )}

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 z-50 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
          <div className="w-full max-w-3xl h-4/5 flex flex-col bg-gray-800 rounded-lg shadow-xl mx-4">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-gray-100">{selectedPage?.filename}</h2>
            </div>
            <div className="flex-1 min-h-0 p-4">
              <div className="h-full overflow-y-auto bg-gray-900 rounded-lg border border-gray-700 p-4">
                <p className="text-gray-300 whitespace-pre-wrap">{pageContent || "Loading..."}</p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-700">
              <div className="flex justify-end">
                <Button onClick={() => setIsModalOpen(false)} className="bg-red-600 hover:bg-red-700 text-white">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default WebpagesTab;