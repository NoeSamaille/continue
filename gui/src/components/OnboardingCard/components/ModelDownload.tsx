import { CheckCircleIcon, CommandLineIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { IdeMessengerContext } from "../../../context/IdeMessenger";
import ReactDOM from "react-dom";
import { StyledLinkButton, StyledTooltip } from "../..";

interface ModelDownloadProps {
  title: string;
  modelName: string;
  hasDownloaded: boolean;
}

function ModelDownload({
  title,
  modelName,
  hasDownloaded,
}: ModelDownloadProps) {
  const ideMessenger = useContext(IdeMessengerContext);
  const command = `ollama pull ${modelName}`;
  const id = `info-hover-${encodeURIComponent(command)}`;
  const tooltipPortalDiv = document.getElementById("tooltip-portal-div");

  function onClick() {
    ideMessenger.ide.runCommand(command);
    ideMessenger.post("copyText", { text: command });
  }

  return (
    <div className="flex flex-col">
      <p className="text-lg font-bold leading-tight mb-2">{title}</p>
      <>
        <StyledLinkButton data-tooltip-id={id} onClick={onClick}>
          <p className="font-mono">{command}</p>
          {hasDownloaded ? (
            <CheckCircleIcon
              width={24}
              height={24}
              className="text-emerald-600"
            />
          ) : (
            <CommandLineIcon width={24} height={24} />
          )}
        </StyledLinkButton>
        {tooltipPortalDiv &&
          ReactDOM.createPortal(
            <StyledTooltip id={id} place="top">
              Copy into terminal
            </StyledTooltip>,
            tooltipPortalDiv,
          )}
      </>
      {/* <div className="flex justify-between items-center">
        
        <>
          <LinkButton
            data-tooltip-id={id}
            onClick={onClick}
            text={command}
            Icon={
              hasDownloaded ? (
                <CheckCircleIcon
                  width={24}
                  height={24}
                  className="text-emerald-600"
                />
              ) : (
                <CommandLineIcon width={24} height={24} />
              )
            }
          />
          {tooltipPortalDiv &&
            ReactDOM.createPortal(
              <StyledTooltip id={id} place="top">
                Copy into terminal
              </StyledTooltip>,
              tooltipPortalDiv,
            )}
        </>
      </div> */}
    </div>
  );
}

export default ModelDownload;
