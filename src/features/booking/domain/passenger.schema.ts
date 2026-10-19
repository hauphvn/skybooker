// src/features/booking/domain/passenger.schema.ts
import {z} from 'zod';

export const removeVietnameseTones = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toUpperCase()
    .trim();
};

export const singlePassengerSchema = z.object({
  title: z.enum(['MR', 'MRS', 'MS'], {error: 'Vui lòng chọn danh xưng'}),
  firstName: z
    .string()
    .min(1, 'Vui lòng nhập tên đệm và tên')
    .transform(removeVietnameseTones),
  lastName: z
    .string()
    .min(1, 'Vui lòng nhập họ')
    .transform(removeVietnameseTones),
  dob: z.string().min(1, 'Vui lòng chọn ngày sinh'),
  idNumber: z
    .string()
    .min(8, 'CCCD hoặc Hộ chiếu từ 8-12 ký tự')
    .max(12, 'Tối đa 12 ký tự')
    .regex(/^[A-Z0-9]+$/i, 'Số CCCD/Hộ chiếu chỉ chứa chữ cái và số'),
});
// ^(0|\+84)[35789][0-9]{8}$
export const checkoutFormSchema = z.object({
  contactEmail: z.email('Email không hợp lệ'),
  contactPhone: z
    .string()
    .regex(/^(0|\+84)[35789][0-9]{8}$/, 'Số điện thoại không hợp lệ (VD: 0901234567)'),
  passengers: z.array(singlePassengerSchema).min(1, 'Cần ít nhất 1 hành khách'),
  baggage: z.enum(['0kg', '20kg', '30kg']),
  meal: z.enum(['NONE', 'HOT_MEAL', 'SNACK']),
  hasInsurance: z.boolean(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
