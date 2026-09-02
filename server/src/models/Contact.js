import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    company: { type: String, trim: true, maxlength: 200, default: '' },
    phone: { type: String, trim: true, maxlength: 32, default: '' },
    // SMS opt-in plus the moment it was given — the consent record the privacy policy promises.
    smsConsent: { type: Boolean, default: false },
    smsConsentAt: { type: Date, default: null },
    role: {
      type: String,
      required: true,
      enum: ['manufacturer', 'warehouse', 'logistics', 'investor'],
    },
    message: { type: String, required: true, trim: true, maxlength: 4000 },
    ip: { type: String, default: '' },
  },
  { timestamps: true },
)

export const Contact = mongoose.model('Contact', contactSchema)
