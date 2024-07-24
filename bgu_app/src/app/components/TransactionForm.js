
// components/TransactionForm.js

"use client";

import { Box, TextField, Typography, Button } from '@mui/material';
import { useState, useEffect } from 'react';

export default function TransactionForm({
  villageName,
  routeId,
  shopName,
  quantity,
  setQuantity,
  rate,
  setRate,
  cash,
  setCash,
  old,
  setOld,
  total,
  remaining,
  handleSubmit
}) {
  const [isRateFocused, setIsRateFocused] = useState(false);
  const [isCashFocused, setIsCashFocused] = useState(false);
  const [isOldFocused, setIsOldFocused] = useState(false);


  const quantityValue = parseFloat(quantity) || 0;
  const rateValue = parseFloat(rate) || 230;
  const cashValue = parseFloat(cash) || 0;
  const oldValue = parseFloat(old) || 0;

  const totalValue = quantityValue * rateValue;
  const remainingValue = totalValue - cashValue;

  const handleTelegramSubmit = () => {
    const telegramToken = "7240758563:AAHc_bUtGSBHWNPRAXuNxSZ4c4zEWH6Lcz0";
    const chatId = "-4209186125";
    const telegramURL = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

    const date = new Date().toLocaleDateString("en-IN", {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    const message = `
दिनांक: ${date}\n
रूट: ${routeId}\n
दुकान का नाम: ${shopName}, ${villageName}\n
मात्रा: ${quantity} Kg\n
रेट: ₹${rateValue}\n
कुल: ₹${totalValue.toFixed(2)}\n
नगदी: ₹${cash}\n
आज के बाक़ी: ₹${remainingValue.toFixed(2)}\n
पुराने जमा: ₹${oldValue.toFixed(2)}\n
    `;

    fetch(telegramURL, {
      method: "POST",
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          alert('Message sent to Telegram successfully');
        } else {
          throw new Error("Telegram API response was not ok.");
        }
      })
      .catch((error) => console.error("Error!", error.message));
  };

  return (
    <Box mt={2}>
      <Typography variant="h6" gutterBottom>
        नया हिसाब जोड़े
      </Typography>
      <Box display="flex" gap={2}>
        <TextField
          id="quantity"
          label="Kg"
          type="number"
          placeholder="कितने किलो माल लिया "
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          id="rate"
          label="रेट"
          type="number"
          placeholder="रेट"
          list="rate-options"
          value={isRateFocused ? rate : rate || '230'}
          onChange={(e) => setRate(e.target.value)}
          onFocus={() => setIsRateFocused(true)}
          onBlur={() => setIsRateFocused(false)}
          fullWidth
          margin="normal"
          step="5"
        />
      </Box>
      <Box display="flex" gap={2}>
        <TextField
          id="cash"
          label="नगदी"
          type="number"
          placeholder="नगदी "
          value={isCashFocused ? cash : cash || '0'}
          onChange={(e) => setCash(e.target.value)}
          onFocus={() => setIsCashFocused(true)}
          onBlur={() => setIsCashFocused(false)}
          fullWidth
          margin="normal"
        />
        <TextField
          id="old"
          label="पुराने जमा"
          type="number"
          placeholder="पुराने जमा "
          value={isOldFocused ? old : old || '0'}
          onChange={(e) => setOld(e.target.value) }// Set default to '0' if value is empty
          onFocus={() => {setIsOldFocused(true);}} 
          
          onBlur={() => {
            setIsOldFocused(false);
           
          }}
          fullWidth
          margin="normal"
        />
      </Box>
      <Box mt={2} display="flex" justifyContent="space-between">
        <Typography id="total" variant="subtitle1">
          कुल मूल्य: {totalValue.toFixed(2)}
        </Typography>
        <Typography id="remaining" variant="subtitle1">
          आज के बाक़ी: {remainingValue.toFixed(2)}
        </Typography>
      </Box>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleTelegramSubmit}>
          जमा करे
        </Button>
      </Box>
    </Box>
  );
}



// "use client";

// import { RouterOutlined } from '@mui/icons-material';
// import { Box, TextField, Typography, Button } from '@mui/material';
// import { useState, useEffect } from 'react';

// export default function TransactionForm({
//   villageId,
//   routeId,
//   handleSubmit,
//   selectedShopName
// }) {
//   const [quantity, setQuantity] = useState('');
//   const [rate, setRate] = useState('230');
//   const [cash, setCash] = useState('0');
//   const [old, setOld] = useState('0');
//   const [total, setTotal] = useState(0);
//   const [remaining, setRemaining] = useState(0);

//   const [isRateFocused, setIsRateFocused] = useState(false);
//   const [isCashFocused, setIsCashFocused] = useState(false);
//   const [isOldFocused, setIsOldFocused] = useState(false);

//   useEffect(() => {
//     resetForm();
//   }, [villageId, routeId]);

//   const resetForm = () => {
//     setQuantity('');
//     setRate('230');
//     // setCash('0');
//     // setOld('0');
  
//   };

//   const quantityValue = parseFloat(quantity) || 0;
//   const rateValue = parseFloat(rate) || 230;
//   const cashValue = parseFloat(cash) || 0;
//   const oldValue = parseFloat(old) || 0;

//   const totalValue = quantityValue * rateValue;
//   const remainingValue = totalValue - cashValue;

//   const handleTelegramSubmit = () => {
//     const telegramToken = "7240758563:AAHc_bUtGSBHWNPRAXuNxSZ4c4zEWH6Lcz0";
//     const chatId = "-4209186125";
//     const telegramURL = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

//     const date = new Date().toLocaleDateString("en-IN", {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit'
//     });

//     const message = `
// दिनांक: ${date}\n
// रूट: ${routeId}\n
// दुकान का नाम: ${selectedShopName}, ${localStorage.getItem('village_name')}\n
// मात्रा: ${quantity} Kg\n
// रेट: ₹${rate}\n
// कुल: ₹${totalValue.toFixed(2)}\n
// नगदी: ₹${cash}\n
// आज के बाक़ी: ₹${remainingValue.toFixed(2)}\n
// पुराने जमा: ₹${oldValue.toFixed(2)}\n
//     `;

//     fetch(telegramURL, {
//       method: "POST",
//       body: JSON.stringify({
//         chat_id: chatId,
//         text: message,
//         parse_mode: "HTML",
//       }),
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((response) => {
//         if (response.ok) {
//           alert('Message sent to Telegram successfully');
//           handleSubmit();
//           resetForm();
//         } else {
//           throw new Error("Telegram API response was not ok.");
//         }
//       })
//       .catch((error) => console.error("Error!", error.message));
//   };

//   return (
//     <Box mt={2}>
//       <Typography variant="h6" gutterBottom>
//         नया हिसाब जोड़े
//       </Typography>
//       <Box display="flex" gap={2}>
//         <TextField
//           id="quantity"
//           label="Kg"
//           type="number"
//           placeholder="कितने किलो माल लिया "
//           value={quantity}
//           onChange={(e) => setQuantity(e.target.value)}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           id="rate"
//           label="रेट"
//           type="number"
//           placeholder="रेट"
//           list="rate-options"
//           value={isRateFocused ? rate : rate || '230'}
//           onChange={(e) => setRate(e.target.value)}
//           onFocus={() => setIsRateFocused(true)}
//           onBlur={() => setIsRateFocused(false)}
//           fullWidth
//           margin="normal"
//           step="5"
//         />
//       </Box>
//       <Box display="flex" gap={2}>
//         <TextField
//           id="cash"
//           label="नगदी"
//           type="number"
//           placeholder="नगदी "
//           value={isCashFocused ? cash : cash || '0'}
//           onChange={(e) => setCash(e.target.value)}
//           onFocus={() => setIsCashFocused(true)}
//           onBlur={() => setIsCashFocused(false)}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           id="old"
//           label="पुराने जमा"
//           type="number"
//           placeholder="पुराने जमा "
//           value={isOldFocused ? old : old || '0'}
//           onChange={(e) => setOld(e.target.value || '0')}
//           onFocus={() => setIsOldFocused(true)}
//           onBlur={() => setIsOldFocused(false)}
//           fullWidth
//           margin="normal"
//         />
//       </Box>
//       <Box mt={2} display="flex" justifyContent="space-between">
//         <Typography id="total" variant="subtitle1">
//           कुल मूल्य: {totalValue.toFixed(2)}
//         </Typography>
//         <Typography id="remaining" variant="subtitle1">
//           आज के बाक़ी: {remainingValue.toFixed(2)}
//         </Typography>
//       </Box>
//       <Box mt={2} display="flex" justifyContent="flex-end">
//         <Button variant="contained" color="primary" onClick={handleTelegramSubmit}>
//           जमा करे
//         </Button>
//       </Box>
//     </Box>
//   );
// }
