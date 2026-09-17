import CounterModel from "../models/counterModel.js";

// ✅ findOneAndUpdate + $inc ek hi atomic DB operation hai — isliye agar
// do orders bilkul ek saath (same millisecond) place ho jayein, tab bhi
// dono ko alag-alag, sahi sequence number milega (koi duplicate/skip nahi hoga)
export const getNextOrderNumber = async () => {
  const counter = await CounterModel.findOneAndUpdate(
    { name: "order" },
    { $inc: { sequence: 1 } },
    { new: true, upsert: true } // upsert: agar counter document nahi hai to bana do
  );

  // ✅ Sequence ko #001, #002, #010, #123 format me convert karo
  const padded = String(counter.sequence).padStart(3, "0");
  return `#${padded}`;
};
