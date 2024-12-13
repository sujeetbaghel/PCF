import * as React from "react";
import { DefaultButton } from "@fluentui/react";

export interface IFileData {
  name: string;
  url: string;
  previewUrl?: string;
}

interface FilePreviewProps {
  recordId: string;
  files: IFileData[];
}

export const FilePreview: React.FC<FilePreviewProps> = ({ recordId, files }) => {
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case "pdf": return "📄";
      case "docx": return "📃";
      case "xlsx": return "📊";
      default: return "📁";
    }
  };

  return (
    <div aria-label={`File list for record ${recordId}`}>
      <h3>Files for Record: {recordId}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {files.map((file, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '5px' }}>
            <h4>{file.name || "Unnamed File"}</h4>
            {file.previewUrl ? (
              <img 
                src={file.previewUrl} 
                alt={`Preview of ${file.name}`} 
                style={{ width: '100%', height: 'auto' }} 
                onError={(e) => (e.currentTarget.src = '/fallback-image.png')} 
              />
            ) : (
              <span style={{ fontSize: '2rem' }}>{getFileIcon(file.name || "")}</span>
            )}
            <DefaultButton 
              href={file.url || "#"} 
              target="_blank" 
              text="Open File" 
              disabled={!file.url} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};
