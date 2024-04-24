import React, { useEffect, useState } from "react";
import fetchPendingInvoices from "../services/fetchInvoices";
import ConfirmationModal from "./ConfirmationModal";
import SelectableList from "./SelectableList";

const AssignmentForm = () => {
    const [receivedInvoices, setReceivedInvoices] = useState([]);
    const [creditNoteInvoices, setCreditNoteInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [selectedCreditNoteInvoice, setSelectedCreditNoteInvoice] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setSelectedCreditNoteInvoice(null);
    }, [selectedInvoice]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchPendingInvoices();
            setReceivedInvoices(result.receivedInvoices);
            setCreditNoteInvoices(result.creditNoteInvoices);
        };

        fetchData();
    }, []);

    const filterCreditNoteInvoices = () => {
        return creditNoteInvoices.filter(creditNoteInvoice => creditNoteInvoice.reference === selectedInvoice.id);
    }

    const handleAssign = () => {
        setCreditNoteInvoices(prevInvoices => prevInvoices.filter(invoice => invoice.id !== selectedCreditNoteInvoice.id));
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        receivedInvoices.length > 0 && (
            <div className="w-1/2">
            <h1 className="text-center text-3xl mb-5">
                Selecciona una Factura
            </h1>
            <div className="h-32 mx-auto">
                <SelectableList invoices={receivedInvoices} onInvoiceSelected={setSelectedInvoice} indexStart={0}/>
            </div>
            {selectedInvoice && (
                <>
                    <h1 className="text-center text-3xl mb-5 mt-11">
                        Selecciona una Nota de crédito
                    </h1>
                    <div className="h-32 mx-auto">
                        <SelectableList 
                        invoices={filterCreditNoteInvoices()} 
                        onInvoiceSelected={setSelectedCreditNoteInvoice} 
                        indexStart={receivedInvoices.length} />
                    </div>
                </>
            )}
            {selectedInvoice && selectedCreditNoteInvoice && (
                <div className="mb-4 flex flex-col items-center justify-center">
                <p>Factura seleccionada: {selectedInvoice.amountInCLP} CLP ({selectedInvoice.amountInUSD} USD)</p>
                <p>
                    Nota de crédito seleccionada: {selectedCreditNoteInvoice.amountInCLP} CLP ({selectedCreditNoteInvoice.amountInUSD} USD)
                </p>
              </div>
            )}
            <div className="flex justify-center">
                <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                style={{ visibility: selectedCreditNoteInvoice ? 'visible' : 'hidden' }} 
                onClick={handleAssign}
                >
                    Asignar
                </button>
            </div>
            <ConfirmationModal isOpen={isModalOpen} onClose={handleCloseModal} creditNote={selectedCreditNoteInvoice} invoice={selectedInvoice} />
        </div>
        )
    );
}

export default AssignmentForm;