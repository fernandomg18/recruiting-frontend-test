const fetchPendingInvoices = async () => {
    try {
        const response = await fetch('https://recruiting.api.bemmbo.com/invoices/pending', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        });
  
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        let data = await response.json();
        data = data.map(invoice => {
            let amountInUSD, amountInCLP;
    
            if (invoice.currency === 'USD') {
            amountInUSD = invoice.amount;
            amountInCLP = invoice.amount * 800;
            } else if (invoice.currency === 'CLP') {
            amountInUSD = invoice.amount / 800;
            amountInCLP = invoice.amount;
            }
    
            return { ...invoice, amountInUSD, amountInCLP };
        });
  
        const receivedInvoices = data.filter(invoice => invoice.type === 'received');
        const creditNoteInvoices = data.filter(invoice => invoice.type === 'credit_note');
        return { receivedInvoices, creditNoteInvoices };
    } catch (error) {
        console.error('Error fetching pending invoices:', error);
        throw error;
    }
};

export default fetchPendingInvoices;