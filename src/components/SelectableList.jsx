import React, { useState } from 'react';

const SelectableList = ({ invoices, onInvoiceSelected, indexStart }) => {
    const [selectedInvoice, setSelectedInvoice] = useState(null);
  
    const handleClick = (invoice) => {
        setSelectedInvoice(invoice);
        onInvoiceSelected(invoice);
    };

    return (
        <div>
            {invoices.map((invoice, index) => (
                <div 
                key={index} 
                onClick={() => handleClick(invoice)}
                className={`flex items-center justify-between p-3 border border-blue-500 ${selectedInvoice === invoice ? 'bg-blue-200' : 'bg-white'} ${index === 0 ? 'rounded-t-lg' : ''} ${index === invoices.length - 1 ? 'rounded-b-lg' : ''}`}            >
                    <div 
                    className={`h-4 w-4 rounded-full mr-2 border-2 border-blue-500 flex items-center justify-center ${selectedInvoice === invoice ? 'bg-blue-500' : 'bg-white'}`}
                    >
                        {selectedInvoice === invoice && <div className="h-1 w-1 bg-white rounded-full"></div>}
                    </div>
                    <div className="mr-2">
                        <span className="font-semibold">inv_{index + indexStart}</span> <span className="text-gray-500">({invoice.organization_id})</span>
                    </div>
                    <div className="mx-auto">
                        <span className="font-semibold">{invoice.amountInCLP} CLP</span> <span className="text-gray-500">({invoice.amountInUSD} USD)</span>
                    </div>
                    <div>
                        {invoice.type === 'received' ? 'Recibida' : 'Nota de crédito'}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SelectableList;