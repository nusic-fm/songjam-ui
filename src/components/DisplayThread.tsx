import {
  Paper,
  TextField,
  Typography,
  Box,
  Button,
  Skeleton,
} from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";

type Props = {
  spaceId: string;
  onGenerateTwitterThread: () => void;
  twitterThread: string[];
};

function DisplayThread({
  spaceId,
  onGenerateTwitterThread,
  twitterThread,
}: Props) {
  const [isGenerating, setIsGenerating] = useState(false);

  if (isGenerating) {
    return (
      <Paper
        sx={{
          background:
            "linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.1))",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(59, 130, 246, 0.2)",
          borderRadius: 3,
          p: 4,
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box>
            <Skeleton
              variant="text"
              width={200}
              height={32}
              sx={{ bgcolor: "rgba(96, 165, 250, 0.1)" }}
            />
            <Skeleton
              variant="text"
              width={240}
              height={20}
              sx={{ bgcolor: "rgba(96, 165, 250, 0.1)" }}
            />
          </Box>
        </Box>

        {[1, 2, 3].map((index) => (
          <Paper
            key={index}
            sx={{
              background: "#000",
              p: 3,
              borderRadius: 3,
              mb: 2,
              border: "1px solid #2f3336",
            }}
          >
            <Skeleton
              variant="text"
              height={24}
              sx={{ bgcolor: "rgba(231, 233, 234, 0.1)" }}
            />
            <Skeleton
              variant="text"
              width="80%"
              height={24}
              sx={{ bgcolor: "rgba(231, 233, 234, 0.1)" }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
                pt: 2,
                borderTop: "1px solid #2f3336",
              }}
            >
              <Skeleton
                variant="text"
                width={60}
                height={20}
                sx={{ bgcolor: "rgba(231, 233, 234, 0.1)" }}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <Skeleton
                  variant="text"
                  width={40}
                  height={20}
                  sx={{ bgcolor: "rgba(231, 233, 234, 0.1)" }}
                />
                {index === 1 && (
                  <Skeleton
                    variant="text"
                    width={80}
                    height={20}
                    sx={{ bgcolor: "rgba(231, 233, 234, 0.1)" }}
                  />
                )}
              </Box>
            </Box>
          </Paper>
        ))}
      </Paper>
    );
  }

  //   if (error) return <div>Error: {error.message}</div>;

  return (
    <Paper
      sx={{
        background:
          "linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.1))",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(59, 130, 246, 0.2)",
        borderRadius: 3,
        p: 4,
        mb: 4,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 12px 40px rgba(59, 130, 246, 0.2)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
            Twitter Thread Generator
          </Typography>
          <Typography variant="caption" sx={{ color: "#60a5fa" }}>
            Each tweet is within the 280 character limit
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => {
            const tweetText = encodeURIComponent(
              twitterThread?.join("\n\n") || ""
            );
            window.open(
              `https://x.com/intent/tweet?text=${tweetText}`,
              "_blank"
            );
          }}
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            textTransform: "none",
            fontWeight: "bold",
            padding: "8px 16px",
            borderRadius: "20px",
            border: "1px solid #536471",
            "&:hover": {
              backgroundColor: "#272c30",
              borderColor: "#272c30",
            },
          }}
        >
          Share on X
        </Button>
        {/* <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  color: "white",
                  "&:hover": {
                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                  },
                }}
                disabled={!hasAccess}
              >
                Remix Thread
              </Button> */}
      </Box>
      {twitterThread.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 4,
          }}
        >
          <LoadingButton
            variant="contained"
            sx={{
              backgroundColor: "#60a5fa",
              "&:hover": {
                backgroundColor: "#3b82f6",
              },
            }}
            onClick={async () => {
              setIsGenerating(true);
              await onGenerateTwitterThread();
              setIsGenerating(false);
            }}
          >
            Generate Twitter Thread
          </LoadingButton>
        </Box>
      ) : (
        <Box>
          {twitterThread?.map((tweet: string, index: number) => (
            <Paper
              key={index}
              sx={{
                background: "#000",
                p: 3,
                borderRadius: 3,
                mb: 2,
                position: "relative",
                border: "1px solid #2f3336",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  border: "1px solid #536471",
                  transform: "scale(1.01)",
                },
              }}
            >
              <TextField
                multiline
                fullWidth
                defaultValue={tweet}
                variant="standard"
                InputProps={{
                  sx: {
                    whiteSpace: "pre-line",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    color: "#e7e9ea",
                    "&:before": { display: "none" },
                    "&:after": { display: "none" },
                  },
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                  pt: 2,
                  borderTop: "1px solid #2f3336",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: tweet.length > 280 ? "#f4212e" : "#71767b",
                    fontSize: "0.85rem",
                  }}
                >
                  {tweet.length}/280
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    size="small"
                    sx={{
                      color: "#71767b",
                      textTransform: "none",
                      minWidth: "auto",
                      transition: "color 0.2s ease",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "#e7e9ea",
                      },
                    }}
                    onClick={() => navigator.clipboard.writeText(tweet)}
                  >
                    Copy
                  </Button>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Paper>
  );
}

export default DisplayThread;
