const readline = require('readline');

class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            'cafe': 3.00,
            'chantily': 1.50,
            'suco': 6.20,
            'sanduiche': 6.50,
            'queijo': 2.00,
            'salgado': 7.25,
            'combo1': 9.50,
            'combo2': 7.50
        };

        this.formasPagamento = {
            'dinheiro': 0.95,
            'debito': 1,
            'credito': 1.03
        };
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        if (!this.formasPagamento.hasOwnProperty(formaDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        let valorTotal = 0;

        for (const itemInfo of itens) {
            const [item, quantidade] = itemInfo.split(',');
            const itemName = item.trim().toLowerCase();

            if (!this.cardapio.hasOwnProperty(itemName)) {
                return "Item inválido!";
            }

            valorTotal += this.cardapio[itemName] * parseFloat(quantidade);
        }

        if (valorTotal === 0) {
            return "Quantidade inválida!";
        }

        for (const itemInfo of itens) {
            const [item] = itemInfo.split(',');

            if (this.cardapio[item][0].toLowerCase().includes('extra')) {
                const principalItem = item.replace('extra', '');

                if (!itens.includes(principalItem)) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }
        }

        valorTotal *= this.formasPagamento[formaDePagamento];

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const caixa = new CaixaDaLanchonete();

rl.question('Informe a forma de pagamento (dinheiro, debito, credito): ', (formaDePagamento) => {
    if (!['dinheiro', 'debito', 'credito'].includes(formaDePagamento)) {
        console.log('Forma de pagamento inválida!');
        rl.close();
        return;
    }

    rl.question('Informe os itens da compra no formato "item,quantidade" separados por vírgula (ex: cafe,1,suco,2): ', (itensInput) => {
        const itens = itensInput.split(', ');

        if (itens.length % 2 !== 0) {
            console.log('Formato inválido para itens da compra!');
            rl.close();
            return;
        }

        const valorCompra = caixa.calcularValorDaCompra(formaDePagamento, itens);

        console.log(valorCompra);

        rl.close();
    });
});
