<template>
  <!-- <nut-form :rules="rules">
    <nut-form-item label="借款用途">
      <nut-picker v-model="formData.loanPurpose" :columns="loanPurposeOptions" />
    </nut-form-item>
    <nut-form-item label="还款期数">
      <nut-picker v-model="formData.repaymentPeriod" :options="repaymentOptions" />
    </nut-form-item>
    <nut-form-item label="手机号码" :error="phoneError" prop="phoneNumber">
      <nut-input v-model="formData.phoneNumber" placeholder="请输入手机号码" />
    </nut-form-item>
    <nut-button type="primary" @click="validatePhone">立即申请</nut-button>
  </nut-form> -->
  <div class="loan-wrap">
    <div class="loan-header">
      <div class="header-main">
        <div class="loan-amount">
          <span class="label">借</span>
          <span class="amount">{{ formData.loanAmount }}</span>
        </div>
        <div class="loan-details">
          <p class="total-loan" @click="onLoanAll">全部借出 {{ total }}</p>
        </div>
      </div>
      <p class="interest-rate warning-text">年化利率 <span class="rate">10.8% - 36%</span>（单利），实际以审核为准</p>
    </div>

    <nut-cell-group>
      <nut-cell title="还款方式">
        <template #link>
          <div class="two-line-wrap">
            <div class="right-info">随借随还</div>
            <div class="right-desc">按日计算，提前还0手续费</div>
          </div>
        </template>
      </nut-cell>
      <nut-cell title="还款期数">
        <!-- @click="repaymentPeriodShow = true" -->
        <template #link>
          <div class="two-line-wrap" @click="repaymentPeriodShow = true">
            <div class="right-info">{{ formData.repaymentPeriod[0] || '' }}</div>
            <div class="right-desc">年化利率10.8%-36%（单利），以实际为准</div>
          </div>
        </template>
      </nut-cell>
      <nut-cell title="还款计划">
        <template #link>
          <div class="one-line-wrap">
            <div class="right-desc">首期01月16日 应还 19666.67元</div>
          </div>
        </template>
      </nut-cell>
    </nut-cell-group>

    <p class="warning-text">* 贷款试算功能，仅作为借还款信息参考</p>
    <nut-cell-group>
      <nut-cell title="利率">
        <template #link>
          <div class="one-line-wrap">
            <div class="right-desc">年化利率10.8%-36% （单利）</div>
          </div>
        </template>
      </nut-cell>
      <nut-cell title="借款用途">
        <template #link>
          <div class="one-line-wrap" @click="loanPurposeShow = true">
            <div class="right-desc">{{ formData.loanPurpose[0] || '' }}</div>
          </div>
        </template>
      </nut-cell>

    </nut-cell-group>

    <nut-cell-group>
      <nut-cell title="手机号">
        <nut-form ref="formRef" :rules="{
          phoneNumber: [
            { required: true, message: '请填写联系电话' },
            { validator: asyncValidator, message: '电话格式不正确' }
          ]
        }" :model-value="formData" style="text-align: center;width: 100%;">
          <nut-form-item label="手机号码" :error="phoneError" prop="phoneNumber">
            <nut-input v-model="formData.phoneNumber" placeholder="凭手机号注册申请（已加密）" />
          </nut-form-item>
        </nut-form>
      </nut-cell>
      <nut-cell title="">
        <nut-button type="info" size="large" @click="onSubmit">立即申请</nut-button>
      </nut-cell>
      <div class="check-wrap">
        <nut-checkbox v-model="checked" text-position="left"></nut-checkbox>
        <p>
          <span>我已阅读并同意</span>
          <a class="info-link"
            href="https://wqbweb.veredloanweb.com/#/pagesA/project/personal/agreement?title=%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF%E5%85%B1%E4%BA%AB%E6%8E%88%E6%9D%83%E4%B9%A6&value=https%3A%252F%252Ffile.grjianr.com%252F20240620%252F3cdf86752d8b4c0c9b3f78b48f145d2b.html">《个人信息共享授权书》</a>
          <a class="wallet-link"
            href="https://wqbweb.veredloanweb.com/#/pagesA/project/personal/agreement?title=%E8%96%87%E9%92%B1%E5%8C%85%E6%B3%A8%E5%86%8C%E5%8D%8F%E8%AE%AE&value=https%3A%252F%252Ffile.grjianr.com%252F20240620%252F4d7d879c4ebd4e1f83720410ca9ef518.html">《薇钱包注册协议》</a>
          <br />
          <a class="process-link"
            href="https://wqbweb.veredloanweb.com/#/pagesA/project/personal/agreement?title=%E9%9A%90%E7%A7%81%E5%8D%8F%E8%AE%AE&value=https%3A%252F%252Ffile.grjianr.com%252F20240723%252F9353474c1e3341b99564e96ca595e768.html">《隐私协议》</a>
        </p>
      </div>
    </nut-cell-group>

    <!-- <nut-cell-group >
      <nut-form ref="ruleForm" :model-value="formData" style="text-align: center;">
        <nut-form>
          <nut-form-item label="手机号码" :error="phoneError" prop="phoneNumber">
            <nut-input v-model="formData.phoneNumber" placeholder="凭手机号注册申请（已加密）" />
          </nut-form-item>
        </nut-form>
        <nut-button type="info" size="large" @click="validatePhone">立即申请</nut-button>
      </nut-form>
    </nut-cell-group> -->

    <nut-popup ref="repaymentPeriodPopup" v-model:visible="repaymentPeriodShow" position="bottom">
      <nut-picker v-model="formData.repaymentPeriod" :columns="repaymentOptions" title="请选择还款期数"
        @confirm="repaymentPeriodConfirm" @cancel="repaymentPeriodShow = false" />
    </nut-popup>

    <nut-popup ref="loanPurposePopup" v-model:visible="loanPurposeShow" position="bottom">
      <nut-picker v-model="formData.loanPurpose" :columns="loanPurposeOptions" title="请选择借款用途"
        @confirm="loanPurposeConfirm" @cancel="loanPurposeShow = false" />
    </nut-popup>


    <nut-popup ref="checkPopup" v-model:visible="checkPopup" position="center" round  v-if="!vilidatePopup" key="checkPopup">
      <div class="check-popup">
        <p>温馨提示</p>
        <p>我已阅读并同意</p>
        <p class="check-link-wrap">
          <a class="info-link"
            href="https://wqbweb.veredloanweb.com/#/pagesA/project/personal/agreement?title=%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF%E5%85%B1%E4%BA%AB%E6%8E%88%E6%9D%83%E4%B9%A6&value=https%3A%252F%252Ffile.grjianr.com%252F20240620%252F3cdf86752d8b4c0c9b3f78b48f145d2b.html">《个人信息共享授权书》</a>
          <a class="wallet-link"
            href="https://wqbweb.veredloanweb.com/#/pagesA/project/personal/agreement?title=%E8%96%87%E9%92%B1%E5%8C%85%E6%B3%A8%E5%86%8C%E5%8D%8F%E8%AE%AE&value=https%3A%252F%252Ffile.grjianr.com%252F20240620%252F4d7d879c4ebd4e1f83720410ca9ef518.html">《薇钱包注册协议》</a>
          <br />
          <a class="process-link"
            href="https://wqbweb.veredloanweb.com/#/pagesA/project/personal/agreement?title=%E9%9A%90%E7%A7%81%E5%8D%8F%E8%AE%AE&value=https%3A%252F%252Ffile.grjianr.com%252F20240723%252F9353474c1e3341b99564e96ca595e768.html">《隐私协议》</a>
        </p>
        <div class="check-popup-btn">
          <nut-button type="default" @click="checkPopup=false">取消</nut-button>
          <nut-button type="info" @click="onAgree">同意并继续</nut-button>
        </div>
      </div>
    </nut-popup>

    <nut-popup ref="vilidatePopup" v-model:visible="vilidatePopup" position="center" round key="vilidatePopup">
      <div class="validate-popup">
        <p>输入验证码</p>
        <nut-input v-model="verificationCode" placeholder="请输入验证码" />
        <div class="button-wrap">
          <nut-button @click="getVerificationCode" :disabled="isCounting">{{ countdownText }}</nut-button>
          <nut-button type="info" @click="validateCode">确认</nut-button>
        </div>
      </div>
    </nut-popup>

  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { loanPurposeOptions, repaymentOptions } from '@/enums';

const formData = reactive({
  loanAmount: 50000,
  payMethod: '',
  repaymentPeriod: ['12'], // 默认选中“12个月”
  payPlan: '',
  rate: '',
  loanPurpose: ['1'], // 默认选中“个人日常消费”
  phoneNumber: '',
})

const loanPurposeShow = ref(false)
const repaymentPeriodShow = ref(false) // 还款期数
const checkPopup = ref(false)
const vilidatePopup = ref(false)
const checked = ref(false)
const total = ref(200000)

const asyncValidator = (val) => {
  const telReg = /^400(-?)[0-9]{7}$|^1\d{10}$|^0[0-9]{2,3}-[0-9]{7,8}$/
  return new Promise((resolve, reject) => {
    if (!val) {
      reject('请输入联系电话')
    } else if (!telReg.test(val)) {
      reject('*请输入正确的手机号')
    } else {
      resolve('success')
    }
  })
}

const phoneNumber = ref('');
const loanPurpose = ref('');
const repaymentPeriod = ref('');
const verificationCode = ref('');
const showPopup = ref(false);
const phoneError = ref('');
const isCounting = ref(false);
const countdown = ref(60);
const countdownText = ref('获取验证码');
const formRef = ref(null)

const validatePhone = () => {
  const phoneRegex = /^1[3-9]\d{9}$/; // 中国大陆手机号格式
  if (!phoneRegex.test(phoneNumber.value)) {
    phoneError.value = '请输入正确手机号';
  } else {
    phoneError.value = '';
    showPopup.value = true;
    startCountdown();
  }
};

const startCountdown = () => {
  isCounting.value = true;
  countdownText.value = `${countdown.value}秒`;
  const timer = setInterval(() => {
    countdown.value--;
    countdownText.value = `${countdown.value}秒`;
    if (countdown.value <= 0) {
      clearInterval(timer);
      isCounting.value = false;
      countdownText.value = '获取验证码';
      countdown.value = 60; // Reset countdown
    }
  }, 1000);
};

const getVerificationCode = async () => {
  // Mock API call to get verification code
  console.log('获取验证码', phoneNumber.value);
};

const validateCode = async () => {
  // Mock API call to validate verification code
  console.log('验证验证码', verificationCode.value);
  // If successful, submit the form
  await submitForm();
};

const submitForm = async () => {
  // Mock API call to submit the form
  console.log('提交表单', {
    phoneNumber: phoneNumber.value,
    loanPurpose: loanPurpose.value,
    repaymentPeriod: repaymentPeriod.value,
    verificationCode: verificationCode.value,
  });
};

const loanPurposeConfirm = ({ selectedValue }) => {
  const value = selectedValue;
  if (value.length) {
    formData.loanPurpose = value;
  }
  loanPurposeShow.value = false
}

const repaymentPeriodConfirm = ({ selectedValue }) => {
  const value = selectedValue;
  console.log('还款期数', value, 'selected', selectedValue);
  if (value.length) {
    formData.repaymentPeriod = value;
  }
  repaymentPeriodShow.value = false
}

const onSubmit = () => {
  formRef.value?.validate().then(({ valid, errors }) => {
    if (valid) {
      console.log('success:', formData)
      // showPopup.value = true
      if (checked.value) {
        vilidatePopup.value = true
        console.log('checked', checked.value, 'vilidatePopup', vilidatePopup.value)
      } else {
        checkPopup.value = true
      }
    } else {
      console.warn('error:', errors)
    }
  })
}

const onLoanAll = () => {
  formData.loanAmount = total
}

const onAgree = () => {
  checked.value = true;
  checkPopup.value = false;
}

</script>

<style lang="scss" scoped>
.loan-wrap {
  .loan-header {
    margin-top: 20px;
    padding: 20px;

    .header-main {
      display: flex;
      justify-content: space-between;
    }

    .loan-amount {
      display: flex;
      align-items: baseline;
      margin-bottom: 10px;

      .amount {
        font-size: 70px;
        font-weight: bold;
        color: #333;
      }

      .label {
        font-size: 26px;
        font-weight: bold;
        margin-right: 15px;
        color: #333;
      }
    }

    .loan-details {
      display: flex;
      align-items: center;

      .total-loan {
        font-size: 28px;
        color: #3474fe;

        .total {
          font-weight: bold;
          color: #333;
        }
      }
    }

    .interest-rate {
      font-size: 22px;
      color: gray;

      .rate {
        color: #007bff; // 蓝色
      }
    }
  }

  .nut-form-item {
    // margin-bottom: 20px;
    border-radius: 20px;
    background: #f2f3f5;

    input {
      background: transparent;
    }
  }

  :deep .nut-cell__title {
    font-weight: bold;
    color: #000;
  }

  :deep .nut-input-box {
    background-color: #f2f3f5;
  }

  :deep .nut-input-inner {
    background-color: #f2f3f5;
  }

  .two-line-wrap {
    text-align: right;

    .right-desc {
      font-size: 20px;
      color: rgb(170, 170, 170);
    }
  }

  .check-wrap {
    display: flex;
    // flex-wrap: wrap;
    align-items: center;
    font-size: 18px;

    span {
      display: inline-block;
      margin-left: 5px;
    }

    a {
      display: inline-block;
      color: rgb(41, 114, 246);
      text-decoration: none;
    }

    .info-link {}

    .wallet-link {}

    .process-link {}

    // 让最后一个元素换行
    a:last-child {
      flex-basis: 100%; // 使最后一个链接独占一行
      margin-top: 10px; // 可选：增加上边距以分隔
    }
  }

  .check-popup {
    height: 350px;
    padding-top: 20px;
    text-align: center;
  }

  .check-link-wrap {
    margin-bottom: 20px;
  }

  .check-popup-btn {
    margin-top: 20px;
  }

  .validate-popup {
    height: 360px;
    text-align: center;
    padding-top: 20px;
    .button-wrap {
      margin-top: 20px;
    }
  }
}
</style>
