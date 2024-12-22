import { http } from '@/utils/request';

/**
 * 账号密码登录
 * @returns UseAxiosReturn
 */
export function loginPassword() {
  return http.post(`/api/login`, {
    data: { name: '123' },
  });
}

// Mock API for getting verification code
export const mockGetVerificationCode = (phoneNumber) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`验证码已发送到 ${phoneNumber}`);
      resolve({ success: true });
    }, 1000);
  });
};

// Mock API for validating verification code
export const mockValidateCode = (code) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`验证码 ${code} 验证成功`);
      resolve({ success: true });
    }, 1000);
  });
};

// Mock API for submitting the form
export const mockSubmitForm = (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('表单提交成功', formData);
      resolve({ success: true });
    }, 1000);
  });
};