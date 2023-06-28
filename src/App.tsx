import React, { useEffect, useState } from 'react';
import { Table, Button, Typography } from 'antd';

const { Title } = Typography;

function App() {
  const [accountBalance, setAccountBalance] = useState(null);
  const [providers, setProviders] = useState([]);
  const [transactionResult, setTransactionResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY =
    '86e7b63e-a39a-4774-90eb-c1fdb364fed0!f09908602ebc2743940871375d940d9d6ed7dc0d805e3f4544b4c397f1a91b46dcbd6af6c18c29';

  useEffect(() => {
    // Fetch account balance
    fetch('https://towerbank.bankathontb.com/bankathon/v1/account', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAccountBalance(data.balance);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching account balance:', error);
        setLoading(false);
      });

    // Fetch providers
    fetch('https://towerbank.bankathontb.com/bankathon/v1/providers', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => setProviders(data.data))
      .catch((error) => console.error('Error fetching providers:', error));
  }, []);

  const handleTransaction = () => {
    const transactionData = {
      accountId: '18400aee-00a5-11ee-be56-0242ac120002',
      amount: 100.0,
      transactionType: 'purchase',
    };

    fetch('https://towerbank.bankathontb.com/bankathon/v1/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: API_KEY,
      },
      body: JSON.stringify(transactionData),
    })
      .then((response) => response.json())
      .then((data) => setTransactionResult(data))
      .catch((error) => console.error('Error performing transaction:', error));
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Title level={3}>Account Balance: {accountBalance}</Title>
          <Title level={4}>Providers:</Title>
          <Table dataSource={providers} columns={columns} pagination={false} />

          <Title level={4} style={{ marginTop: '20px' }}>
            Perform Transaction:
          </Title>
          <Button type="primary" onClick={handleTransaction}>
            Make Transaction
          </Button>

          {transactionResult && (
            <div style={{ marginTop: '20px' }}>
              <Title level={4}>Transaction Result:</Title>
              <p>Transfer ID: {transactionResult.transferId}</p>
              <p>New Account Balance: {transactionResult.balance}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
