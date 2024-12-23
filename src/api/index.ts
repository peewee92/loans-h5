import { http } from '@/utils/request';
const baseUrl = 'https://dev.usemock.com/676930876c5974829061dcde';
/**
 * 账号密码登录
 * @returns UseAxiosReturn
 */
export function loginPassword() {
  return http.post(`/api/login`, {
    data: { name: '123' },
  });
}
// 申请获取验证码，传入 phoneNumber
// 返回{
//   code: 200,
//   message: 'ok',
//   data: {
//     verificationCode: '123456'
//   }, // 返回验证码
// }
// Mock API for getting verification code
export const mockGetVerificationCode = (phoneNumber) => {
  return http.get(`${baseUrl}/api/getVerificationCode`, {
    params: { phoneNumber }, // 传入 phoneNumber
  });
};

// Mock API for submitting the form
// formData: { loanAmount // 借款数量 ,way: 还款方式. 还款期数 periods, 还款计划plan,
//  利率rate，用途 purpose，手机号 phoneNumber; 验证码 verificationCode,  }
// 返回{
//   "code": 200,
//   "message": "ok",
//   "data": {
//     "id": ""
//   }
// }
interface formData {
  loanAmount: number;
  way: string;
  periods: string;
  plan: string;
  rate: string;
  purpose: string;
  phoneNumber: string;
  verificationCode: string;
}
export const mockSubmitForm = (formData:formData) => {
  return http.post(`${baseUrl}/api/submitForm`, formData);
};