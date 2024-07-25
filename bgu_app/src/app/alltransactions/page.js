

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import supabaseClient from "../../utils/supabaseClient";
const supabase = supabaseClient;

const date = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

export default function AllTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState({
    quantity: 0,
    total: 0,
    cash: 0,
    old: 0,
    remaining: 0,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchTransactions();
  }, []);

  // ... (keep all other functions as they are)
  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from("daily_transactions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching transactions:", error);
    } else {
      setTransactions(data);
      calculateTotals(data);
    }
  };

  const calculateTotals = (data) => {
    const newTotals = data.reduce(
      (acc, transaction) => ({
        quantity: acc.quantity + transaction.quantity,
        total: acc.total + transaction.total,
        cash: acc.cash + transaction.cash,
        old: acc.old + transaction.old,
        remaining: acc.remaining + transaction.remaining,
      }),
      { quantity: 0, total: 0, cash: 0, old: 0, remaining: 0 }
    );

    setTotals(newTotals);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    const { error } = await supabase
      .from("daily_transactions")
      .delete()
      .eq("id", deleteId);

    if (error) {
      console.error("Error deleting transaction:", error);
    } else {
      fetchTransactions();
    }
    setOpenDialog(false);
  };

  const sendTotalToTelegram = async () => {
    const telegramToken = "7240758563:AAHc_bUtGSBHWNPRAXuNxSZ4c4zEWH6Lcz0";
    const chatId = "-4209186125";
    const telegramURL = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

    const message = `
दिनांक: ${date} का कुल हिसाब:\n
कुल माल बिका : ${totals.quantity.toFixed(2)} Kg
इतने का माल बिका : ₹${totals.total.toFixed(2)}
नगदी आइ : ₹${totals.cash.toFixed(2)}
उधारी आइ : ₹${totals.old.toFixed(2)}
उधारी दी : ₹${totals.remaining.toFixed(2)}
कुल रुपे आए : ₹${(totals.cash + totals.old).toFixed(2)}
    `;

    try {
      const response = await fetch(telegramURL, {
        method: "POST",
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setSnackbarMessage("हिसाब सफलतापूर्वक टेलीग्राम पर भेजा गया!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      } else {
        throw new Error("Failed to send totals to Telegram");
      }
    } catch (error) {
      console.error("Error sending totals to Telegram:", error);
      setSnackbarMessage("हिसाब भेजने में समस्या आई। कृपया पुनः प्रयास करें।");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {/* ... (keep all other JSX as it is) */}
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        आज का कुल हिसाब{" "}
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Total हिसाब
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={2.4}>
            <Typography>
              कुल इतना माल बिका : {totals.quantity.toFixed(2)} Kg
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Typography>
              आज कुल इतने का माल बिका : ₹{totals.total.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Typography>आज की कुल नगदी : ₹{totals.cash.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Typography>आज इतनी उधारी आइ : ₹{totals.old.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Typography>
              आज की कुल उधारी : ₹{totals.remaining.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Typography>
              Total रुपे आए : ₹{(totals.cash + totals.old).toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Box
        sx={{ mb: 2, mt: 4, display: "flex", justifyContent: "space-between" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/")}
        >
          Main पेज
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={sendTotalToTelegram}
        >
          telegram पर भेजें
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {transactions.map((transaction) => (
          <Grid item xs={12} sm={6} md={4} key={transaction.id}>
            <Card
              sx={{
                border: `2px solid ${
                  transaction.remaining === 0 ? "green" : "red"
                }`,
              }}
            >
              <CardContent>
                <Typography variant="h6">{transaction.shop_name}</Typography>
                <Typography color="textSecondary" gutterBottom>
                  {transaction.village_name}
                </Typography>
                <Typography>मात्रा : {transaction.quantity} Kg</Typography>
                <Typography>
                  कुल रुपए : ₹{transaction.total.toFixed(2)}
                </Typography>
                <Typography>नगदी : ₹{transaction.cash.toFixed(2)}</Typography>
                <Typography>
                  पुराने जमा : ₹{transaction.old.toFixed(2)}
                </Typography>
                <Typography>
                  आज के बाक़ी : ₹{transaction.remaining.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleDelete(transaction.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            क्या आप वाकई इस हिसाब को Delete करना चाहते हैं? डिलीट करने के बाद
            हिसाब वापस नहीं लाया जा सकता है
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

// // page.js
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Container,
//   Box,
//   Typography,
//   Button,
//   Grid,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Snackbar,
//   Alert,
// } from "@mui/material";

// import { fetchTransactions, calculateTotals } from "./utils/fetchData";
// import { sendTotalToTelegram } from "./utils/sendTelegram";
// import TransactionCard from "./components/TransactionCard";
// import TransactionSummary from "./components/TransactionSummary";

// const date = new Date().toLocaleDateString("en-IN", {
//   year: "numeric",
//   month: "2-digit",
//   day: "2-digit",
// });

// export default function AllTransactions() {
//   const [transactions, setTransactions] = useState([]);
//   const [totals, setTotals] = useState({
//     quantity: 0,
//     total: 0,
//     cash: 0,
//     old: 0,
//     remaining: 0,
//   });
//   const [openDialog, setOpenDialog] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const router = useRouter();
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");

//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await fetchTransactions();
//         setTransactions(data);
//         setTotals(calculateTotals(data));
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//       }
//     })();
//   }, []);

//   const handleDelete = (id) => {
//     setDeleteId(id);
//     setOpenDialog(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       const { error } = await supabase
//         .from("daily_transactions")
//         .delete()
//         .eq("id", deleteId);

//       if (error) throw error;

//       const data = await fetchTransactions();
//       setTransactions(data);
//       setTotals(calculateTotals(data));
//       setOpenDialog(false);
//     } catch (error) {
//       console.error("Error deleting transaction:", error);
//     }
//   };

//   const handleTelegramSubmit = async () => {
//     try {
//       await sendTotalToTelegram(totals, date);
//       setSnackbarMessage("हिसाब सफलतापूर्वक टेलीग्राम पर भेजा गया!");
//       setSnackbarSeverity("success");
//       setOpenSnackbar(true);
//     } catch (error) {
//       console.error("Error sending totals to Telegram:", error);
//       setSnackbarMessage("हिसाब भेजने में समस्या आई। कृपया पुनः प्रयास करें।");
//       setSnackbarSeverity("error");
//       setOpenSnackbar(true);
//     }
//   };

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setOpenSnackbar(false);
//   };

//   return (
//     <Container sx={{ mt: 4, mb: 4 }}>
//       <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
//         आज का कुल हिसाब{" "}
//       </Typography>

//       <TransactionSummary totals={totals} />

//       <Box
//         sx={{ mb: 2, mt: 4, display: "flex", justifyContent: "space-between" }}
//       >
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => router.push("/")}
//         >
//           Main पेज
//         </Button>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleTelegramSubmit}
//         >
//           telegram पर भेजें
//         </Button>
//       </Box>

//       <Grid container spacing={3} sx={{ mt: 1 }}>
//         {transactions.map((transaction) => (
//           <Grid item xs={12} sm={6} md={4} key={transaction.id}>
//             <TransactionCard transaction={transaction} handleDelete={handleDelete} />
//           </Grid>
//         ))}
//       </Grid>

//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             क्या आप वाकई इस हिसाब को Delete करना चाहते हैं? डिलीट करने के बाद
//             हिसाब वापस नहीं लाया जा सकता है
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={confirmDelete} color="secondary" autoFocus>
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//         open={openSnackbar}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbarSeverity}
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// }
