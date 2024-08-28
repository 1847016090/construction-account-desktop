import { invoke } from '@tauri-apps/api';
import { memo } from 'react';
const Template = () => {
  const onGreet = () => {
    invoke('greet', { name: 'World' })
      // `invoke` 返回异步函数
      .then((response) => console.log(response));
  };
  return (
    <div>
      <button onClick={onGreet}>点击</button>
    </div>
  );
};

export default memo(Template);
