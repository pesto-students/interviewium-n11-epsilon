import { useCallback, useState } from 'react';

export default function Social() {
  const [subscribers, setSubscribers] = useState(8000);
  const handleSubscribe = useCallback(() => {
    setSubscribers(subs => subs + 1);
  }, []);

  return (<>
    <h1>Subscribers: {subscribers}</h1>
    <button onClick={handleSubscribe}>
      Subscribe
    </button>
  </>);
}
