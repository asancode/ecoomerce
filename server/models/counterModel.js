import mongoose from "mongoose";

// ✅ Yeh model sirf ek counter store karta hai — MongoDB me auto-increment
// built-in nahi hota, isliye alag se counter maintain karna padta hai.
const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g. "order"
  sequence: { type: Number, default: 0 },
});

const CounterModel = mongoose.model("counter", counterSchema);
export default CounterModel;
