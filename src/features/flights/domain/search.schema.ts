import {z} from "zod";


export const flightSearchSchema = z
  .object({
    tripType: z.enum(['roundTrip', 'oneWay']),
    origin: z.string().length(3, 'Mã sân bay đi không hợp lệ'),
    destination: z.string().length(3, 'Mã sân bay đến không hợp lệ'),
    departureDate: z.date({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      required_error: 'Vui lòng chọn ngày cất cánh',
    }),
    returnDate: z.date().optional(),
    passengers: z
      .object({
        adults: z.number().min(1, 'Cần tối thiểu 1 người lớn').max(9),
        children: z.number().min(0).max(8),
        infants: z.number().min(0).max(4),
      })
      .refine((data) => data.infants <= data.adults, {
        message: 'Mỗi người lớn chỉ được kèm tối đa 1 em bé dưới 2 tuổi',
        path: ['infants'],
      }),
    seatClass: z.enum(['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS']),
  })
  .refine((data) => data.origin !== data.destination, {
    message: 'Điểm đến không được trùng với điểm cất cánh',
    path: ['destination'],
  })
  .refine(
    (data) => {
      if (data.tripType === 'roundTrip') {
        return !!data.returnDate && data.returnDate >= data.departureDate;
      }
      return true;
    },
    {
      message: 'Ngày về phải cùng ngày hoặc sau ngày đi',
      path: ['returnDate'],
    }
  );

export type FlightSearchFormValues = z.infer<typeof flightSearchSchema>;
