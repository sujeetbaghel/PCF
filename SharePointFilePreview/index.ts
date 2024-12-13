import * as React from 'react'; 
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { IFileData, FilePreview } from './components/FilePreview';

export class SharePointFilePreview implements ComponentFramework.ReactControl<IInputs, IOutputs> {
  private notifyOutputChanged: () => void;

  public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void): void {
    this.notifyOutputChanged = notifyOutputChanged;
  }

  public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
    const recordId = context.parameters.recordId.raw || "";
    const files: IFileData[] = context.parameters.files.records?.map(fileRecord => {
      try {
        return {
          name: fileRecord.getValue("name"),
          url: fileRecord.getValue("sharepointUrl"),
          previewUrl: fileRecord.getValue("previewUrl")
        };
      } catch (error) {
        console.error("Error processing file record:", error);
        return null; // Return null to filter out invalid records
      }
    }).filter(file => file !== null) || [];

    return <FilePreview recordId={recordId} files={files} />;
  }

  public getOutputs(): IOutputs {
    return {};
  }

  public destroy(): void {
    // Cleanup logic if needed
  }
}
