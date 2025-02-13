export const URI = 'https://platform.fintacharts.com';
export const webSocketURL = 'wss://platform.fintacharts.com/api/streaming/ws/v1/realtime';
export const webSocketMessage = {
    "type": "l1-subscription",
    "id": "1",
    "instrumentId": "ad9e5345-4c3b-41fc-9437-1d253f62db52",
    "provider": "simulation",
    "subscribe": true,
    "kinds": [
      "ask",
      "bid",
      "last"
    ]
  };