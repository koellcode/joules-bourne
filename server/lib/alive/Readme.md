**Alive Status**
----
  Returns json data about the server status.

* **URL**

  /api/v1/alive

* **Method:**

  `GET`

*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ status: true }`

* **Error Response:**

  None

* **Sample Call:**

  ```shell
    curl -X GET http://localhost:3000/api/v1/alive
  ```
