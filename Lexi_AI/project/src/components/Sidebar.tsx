// src/components/Sidebar.tsx
import React, { useRef, useState, useEffect } from "react";
import { FileText, Upload, Clipboard, Clock, X } from "lucide-react";
import { motion } from "framer-motion";
import { Document } from "../types";

interface SidebarProps {
  onLoadDocument: (docId: string) => void;
  currentDocument: Document | null;
  onImageUpload: (file: File) => void;
  showLoan: boolean;
  showRent: boolean;
  onPasteSubmit: (text: string) => void;
}

export default function Sidebar({
  onLoadDocument,
  currentDocument,
  onImageUpload,
  showLoan,
  showRent,
  onPasteSubmit,
}: SidebarProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Upload simulation state
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentFileName, setCurrentFileName] = useState<string | null>(null);

  // Paste modal state
  const [isPasteOpen, setIsPasteOpen] = useState(false);
  const [pasteText, setPasteText] = useState<string>("");

  // Prefill with provided sample Terms of Service
  const sampleToS = `Sample Terms of Service Template

Terms of Service ("Terms")

Our Terms of Service were last updated on [DATE].

Please read these terms and conditions carefully before using Our Service.

Interpretation and Definitions

Interpretation

The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.

Definitions

For the purposes of these Terms of Service:

"Affiliate" means an entity that controls, is controlled by or is under common control with a party,

where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.

"Account" means a unique account created for You to access our Service or parts of our Service.

"Company" (referred to as either "the Company", "We". "Us" or "Our" in this Agreement) refers to

[COMPANY INFORMATION].

"Country" refers to [COMPANY_COUNTRY]

Content refers to content such as text, images, or other information that can be posted, uploaded, linked to or otherwise made available by You, regardless of the form of that content.

"Device" means any device that can access the Service such as a computer, a cell phone or a

digital tablet.

'Feedback" means feedback, innovations or suggestions sent by You regarding the attributes, performance or features of our Service.

"Service" refers to the Website.

Terms of Service (also referred as "Terms") mean these Terms of Service that form the entire agreement`;

  useEffect(() => {
    setPasteText(sampleToS);
    // cleanup preview URL on unmount
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // open file picker
  const openFilePicker = () => {
    if (!uploading) fileInputRef.current?.click();
  };

  // Starter: called when input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      window.alert("Please upload an image (PNG/JPG) for the demo.");
      e.currentTarget.value = "";
      return;
    }
    // Start simulated upload
    simulateUpload(f);
    // reset input so same file can be chosen again later
    e.currentTarget.value = "";
  };

  // Realistic progress simulation that shows preview + percent
  const simulateUpload = (file: File) => {
    // create preview immediately
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    setCurrentFileName(file.name);

    setUploading(true);
    setProgress(0);

    let current = 0;
    const interval = setInterval(() => {
      // increments: mix of small and medium to feel realistic
      const inc = Math.floor(Math.random() * 12) + 4; // 4..15
      current = Math.min(100, current + inc);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        // small finishing delay for realism
        setTimeout(() => {
          setProgress(100);
          // call parent handler (reveals Loan/Rent)
          onImageUpload(file);

          // keep preview visible briefly so user sees result, then clear UI
          setTimeout(() => {
            setPreviewUrl(null);
            setCurrentFileName(null);
            setUploading(false);
            setProgress(0);
          }, 1000);
        }, 600);
      }
    }, 300); // 300ms ticks -> realistic pacing
  };

  // paste modal submit
  const submitPaste = () => {
    if (!pasteText || pasteText.trim().length < 10) {
      window.alert("Please paste a valid document text before submitting.");
      return;
    }
    setIsPasteOpen(false);
    onPasteSubmit(pasteText);
  };

  return (
    <motion.aside
      initial={{ x: -280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.28 }}
      role="navigation"
      aria-label="Document selector"
      className="w-80 p-6 glass-card rounded-r-2xl"
    >
      <h2 className="sr-only">Documents</h2>

      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#e0f2fe] to-[#ede9fe] flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">LexiAI</div>
            <div className="text-xs text-gray-500">Legal made simple</div>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
        disabled={uploading}
      />

      <div className="space-y-3">
        {/* Conditionally render Loan / Rent buttons */}
        {showLoan && (
          <DocumentButton
            title="Loan Agreement"
            subtitle="Partnership loan with demand repayment clause..."
            active={currentDocument?.id === "loan-agreement"}
            onClick={() => onLoadDocument("loan-agreement")}
            disabled={uploading}
          />
        )}

        {showRent && (
          <DocumentButton
            title="Rent Agreement"
            subtitle="Commercial property lease with 11-month term..."
            active={currentDocument?.id === "rent-agreement"}
            onClick={() => onLoadDocument("rent-agreement")}
            disabled={uploading}
          />
        )}

        <motion.button
          type="button"
          whileHover={{ scale: uploading ? 1 : 1.02 }}
          whileTap={{ scale: uploading ? 1 : 0.98 }}
          onClick={() => setIsPasteOpen(true)}
          className={`w-full p-4 rounded-xl border border-white/30 bg-white/40 hover:bg-white/60 transition-all duration-150 text-left focus:outline-none focus:ring-2 ${
            uploading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          aria-label="Paste text"
          disabled={uploading}
        >
          <div className="flex items-center gap-3">
            <Clipboard className="w-5 h-5 text-gray-600 flex-shrink-0" />
            <div className="min-w-0">
              <h3 className="font-medium text-gray-900">Paste Text</h3>
              <p className="text-sm text-gray-600">Paste your legal document</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: uploading ? 1 : 1.02 }}
          whileTap={{ scale: uploading ? 1 : 0.98 }}
          onClick={openFilePicker}
          className={`w-full p-4 rounded-xl border border-white/30 bg-white/40 hover:bg-white/60 transition-all duration-150 text-left focus:outline-none focus:ring-2 ${
            uploading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          aria-label="Upload image (demo)"
          disabled={uploading}
        >
          <div className="flex items-center gap-3">
            <Upload className="w-5 h-5 text-gray-600 flex-shrink-0" />
            <div className="min-w-0">
              <h3 className="font-medium text-gray-900">Upload Image</h3>
              <p className="text-sm text-gray-600">Select a PNG/JPG to reveal demo docs</p>
            </div>
          </div>
        </motion.button>

        {/* Upload preview + progress */}
        {uploading && (
          <div className="mt-2 p-3 bg-white/30 rounded-lg border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-md bg-white/10 flex items-center justify-center overflow-hidden">
                {previewUrl ? (
                  <img src={previewUrl} alt="upload preview" className="w-full h-full object-cover" />
                ) : (
                  <Upload className="w-6 h-6 text-white/80" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900 truncate">{currentFileName}</div>
                  <div className="text-xs text-gray-600">{progress}%</div>
                </div>

                <div className="mt-2">
                  <div className="w-full bg-white/40 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.25 }}
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                    />
                  </div>
                  <div className="mt-2 text-xs text-gray-500">Uploading… please wait</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Paste Modal */}
      {isPasteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsPasteOpen(false)} />
          <div className="relative z-60 w-full max-w-2xl">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Paste Document Text</h3>
                  <p className="text-sm text-gray-500">Paste the full text of your document below and click Process.</p>
                </div>
                <button type="button" onClick={() => setIsPasteOpen(false)} className="text-gray-500">
                  <X />
                </button>
              </div>

              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                rows={12}
                className="w-full p-3 border border-gray-200 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-200"
              />

              <div className="flex items-center justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsPasteOpen(false)}
                  className="px-4 py-2 bg-white border rounded-lg text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitPaste}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg"
                >
                  Process Pasted Text
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.aside>
  );
}

/* small repeated document button component */
function DocumentButton({
  title,
  subtitle,
  active,
  onClick,
  disabled,
}: {
  title: string;
  subtitle: string;
  active?: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      aria-pressed={active ? "true" : "false"}
      className={`w-full p-4 rounded-xl border transition-all duration-150 text-left focus:outline-none focus:ring-2 ${
        active ? "bg-primary-50 border-primary-200 shadow-md" : "bg-white/40 border-white/30 hover:bg-white/60"
      } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
      disabled={disabled}
    >
      <div className="flex items-start gap-3">
        <FileText className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{subtitle}</p>
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
           
          </div>
        </div>
      </div>
    </motion.button>
  );
}
