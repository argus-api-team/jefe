import { helper } from '@ember/component/helper';

export function percentageDisplay(params) {
  const percentage = (params * 100).toFixed(2);
  return `${percentage} %`;
}

export default helper(percentageDisplay);
