import { useEffect, useState } from "react";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;
  useEffect(() => {
    const memoMessage = async () => {
      const memos = await contract.getMemo();
      setMemos(memos);
    };
    contract && memoMessage();
  }, [contract]);

  return (
    <div>
      <p style={{ textAlign: "center", marginTop: "20px" }}>Transaction</p>
      <div className="container-fluid">
        <table className="table" style={{ width: "100%" }}>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th
                style={{
                  backgroundColor: "lightgreen",
                  width: "20%",
                  border: "1px solid white",
                }}
              >
                Name
              </th>
              <th
                style={{
                  backgroundColor: "lightgreen",
                  width: "20%",
                  border: "1px solid white",
                }}
              >
                Message
              </th>
              <th
                style={{
                  backgroundColor: "lightgreen",
                  width: "20%",
                  border: "1px solid white",
                }}
              >
                Time
              </th>
              <th
                style={{
                  backgroundColor: "lightgreen",
                  width: "20%",
                  border: "1px solid white",
                }}
              >
                from
              </th>
            </tr>
          </thead>
          <tbody>
            {memos.map((memo) => {
              return (
                <tr key={memo.timestamp} style={{ textAlign: "center" }}>
                  <td
                    style={{
                      backgroundColor: "lightblue",
                      width: "10%",
                      border: "1px solid white",
                    }}
                  >
                    {memo.name}
                  </td>
                  <td
                    style={{
                      backgroundColor: "lightblue",
                      width: "20%",
                      border: "1px solid white",
                    }}
                  >
                    {memo.message}
                  </td>
                  <td
                    style={{
                      backgroundColor: "lightblue",
                      width: "30%",
                      border: "1px solid white",
                    }}
                  >
                    {new Date(memo.timestamp * 1000).toLocaleString()}
                  </td>
                  <td
                    style={{
                      backgroundColor: "lightblue",
                      width: "40%",
                      border: "1px solid white",
                    }}
                  >
                    {memo.from}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Memos;
