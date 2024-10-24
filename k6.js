import http from 'k6/http';
import { sleep, group, check } from 'k6';

export let options = {
  vus: 500,  // Number of virtual users
  duration: '3s',  // Duration of the test
};

let successCount = 0; // Counter for successful requests
let failureCount = 0; // Counter for failed requests

export default function () {
  // Group 1: Simulate other behavior (e.g., Get Request)
//   group('Post Data to /api/data', () => {
//     const url = 'http://0.0.0.0:5000/api/data';
//     const payload = JSON.stringify({
//       "name": "deepu",
//       "email": "deepu@gmail.com"
//     });

//     const params = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };

//     const res = http.post(url, payload, params);
//     console.log(`Response status: ${res.status}`);
    
//     // Optional: Check if the response was successful
//     if (res.status !== 200) {
//       console.error(`Request failed. Status: ${res.status}`);
//     }
//     // sleep(1);  // Pause for 1 second between requests
//   });
  group('Get Data from /api/data', () => {
    const getUrl = 'http://0.0.0.0:5000/api/data';
    const res = http.get(getUrl);

    // Check if the response status is 200
    const isSuccess = check(res, {
      'is status 200': (r) => r.status === 200,
    });

    // Increment counters based on success or failure
    if (isSuccess) {
      successCount++;
      console.log(`GET request status: ${res.status} - Success`);
    } else {
      failureCount++;
      console.error(`GET request failed. Status: ${res.status}`);
    }

    sleep(1);  // Pause for 1 second between requests
  });
}

// Execute the summary report after the test is done
export function teardown(data) {
  console.log(`Total Successful Requests: ${successCount}`);
  console.log(`Total Failed Requests: ${failureCount}`);
}
