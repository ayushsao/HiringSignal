import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X } from "lucide-react";

export default function ResumeUploader({ file, setFile, resumeText, setResumeText }) {
  const onDrop = useCallback(
    (accepted) => {
      if (accepted.length > 0) {
        setFile(accepted[0]);
        setResumeText(""); // clear paste if file uploaded
      }
    },
    [setFile, setResumeText]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <div className="space-y-4">
      {/* Drag & Drop Zone */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
          isDragActive
            ? "border-brand-500 bg-brand-50 dark:bg-brand-950/30"
            : "border-gray-300 dark:border-gray-700 hover:border-brand-400 dark:hover:border-brand-600"
        }`}
      >
        <input {...getInputProps()} />
        <AnimatePresence mode="wait">
          {file ? (
            <motion.div
              key="file"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center gap-3"
            >
              <FileText className="w-8 h-8 text-brand-500" />
              <div className="text-left">
                <p className="font-semibold text-brand-600 dark:text-brand-400">{file.name}</p>
                <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                className="ml-2 p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-red-400 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Upload className="w-10 h-10 mx-auto text-gray-400 dark:text-gray-500 mb-3" />
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                {isDragActive ? "Drop your resume here" : "Drag & drop your resume PDF"}
              </p>
              <p className="text-xs text-gray-400 mt-1">or click to browse · PDF only · Max 5MB</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Or divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">or paste text</span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Text paste area */}
      <textarea
        value={resumeText}
        onChange={(e) => {
          setResumeText(e.target.value);
          if (e.target.value) setFile(null); // clear file if pasting
        }}
        placeholder="Paste your resume text here..."
        rows={8}
        className="w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 resize-none placeholder:text-gray-400 dark:placeholder:text-gray-600"
      />
    </div>
  );
}
