// Vercel Serverless Function — Mercado Pago Checkout Pro
// Configure MP_ACCESS_TOKEN and SITE_URL in Vercel Project Settings > Environment Variables.
const PRODUCTS = {
  1:{name:"Lily L’Or Elixir Eau de Parfum, 75 ml",price:329.90},
  2:{name:"Lily L’Or Elixir Creme Acetinado, 200 g",price:143.90},
  3:{name:"Lily L’Or Shampoo, 250 ml",price:54.90},
  4:{name:"Cuide-se Bem Body Splash Pessegura, 200 ml",price:75.90},
  5:{name:"Eudora Club 6 Prestige Eau de Parfum, 95 ml",price:139.90},
  6:{name:"Eudora Absolu Eau de Parfum, 75 ml",price:179.90},
  7:{name:"Kit Presente Kiss Me Cabernet",price:119.90},
  8:{name:"Kit Instance Baunilha Glow",price:89.90},
  9:{name:"Pop Base Líquida, 30 ml",price:34.90},
  10:{name:"Pop Lápis para Olhos, 1,1 g",price:19.90},
  11:{name:"Pop Batom, 3,6 g",price:18.90},
  12:{name:"Lip Oil Cuide-se Bem Feira, 4 ml",price:54.90},
  13:{name:"Madeleine 862 La Chocolatine Eau de Parfum, 75 ml",price:349},
  14:{name:"Madeleine 862 Eau de Parfum, 75 ml",price:349},
  15:{name:"Scapin 245 Eau de Parfum, 75 ml",price:389},
  16:{name:"Crème Riche Hidratante Corporal Madeleine 862, 200 g",price:156},
  17:{name:"Lily L’Or Máscara Condicionante, 200 ml",price:67.90},
  18:{name:"Lily Sérum Leave-in Acetinado, 100 ml",price:61.90},
  19:{name:"Casa 214 Difusor by Lily, 250 ml",price:151.90},
  20:{name:"Casa 214 Vela by Lily, 170 g",price:119.90},
  21:{name:"Cuide-se Bem Body Splash Nuvem, 200 ml",price:75.90},
  22:{name:"Madeleine 862 La Pistacherie Eau de Parfum, 75 ml",price:389},
  23:{name:"Madeleine 862 Refil, 75 ml",price:279},
  24:{name:"Madeleine 862 Eau de Parfum, 30 ml",price:214},
  25:{name:"Scapin 245 Intense Eau de Parfum, 75 ml",price:394},
  26:{name:"Pop Máscara para Cílios, 10 g",price:34.90},
  27:{name:"Base Líquida Instamatte, 30 ml",price:34.90},
  28:{name:"Corretivo Facial Tint Alta Cobertura, 9 ml",price:35.90},
  29:{name:"Base Líquida Tint Alta Cobertura, 30 ml",price:55.90},
  30:{name:"NiiNA Secrets Batom Glassy Lips, 2 ml",price:59.90},
  31:{name:"NiiNA Secrets Paleta Shine Take 2, 5,4 g",price:74.90}
};
module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({error:"Método não permitido."}); }
  if (!process.env.MP_ACCESS_TOKEN) return res.status(503).json({error:"Pagamento ainda não configurado. A loja precisa ativar as credenciais do Mercado Pago na Vercel."});
  try {
    const {items, customer} = req.body || {};
    if (!Array.isArray(items) || items.length < 1 || items.length > 50) return res.status(400).json({error:"Carrinho inválido."});
    if (!customer || !customer.name || !customer.email || !customer.phone || !customer.cep || !customer.address || !customer.number || !customer.city || !customer.state) return res.status(400).json({error:"Preencha todos os dados de contato e entrega."});
    const mpItems = [];
    for (const row of items) {
      const id = Number(row.id), qty = Number(row.quantity), product = PRODUCTS[id];
      if (!product || !Number.isInteger(qty) || qty < 1 || qty > 20) return res.status(400).json({error:"Um dos produtos ou quantidades é inválido."});
      mpItems.push({id:String(id),title:product.name,quantity:qty,currency_id:"BRL",unit_price:product.price});
    }
    const siteUrl = (process.env.SITE_URL || "https://boticadafabi.vercel.app").replace(/\/$/,"");
    const externalReference = "BF-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).slice(2,8).toUpperCase();
    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method:"POST",
      headers:{"Authorization":"Bearer "+process.env.MP_ACCESS_TOKEN,"Content-Type":"application/json"},
      body:JSON.stringify({
        items:mpItems,
        payer:{name:String(customer.name).slice(0,100),email:String(customer.email).slice(0,150),phone:{number:String(customer.phone).replace(/[^0-9]/g,"").slice(0,20)}},
        shipments:{receiver_address:{zip_code:String(customer.cep).replace(/[^0-9]/g,"").slice(0,8),street_name:String(customer.address).slice(0,150),street_number:String(customer.number).slice(0,20),floor:String(customer.complement||"").slice(0,80),city_name:String(customer.city).slice(0,100),state_name:String(customer.state).slice(0,100)}},
        external_reference:externalReference,
        metadata:{store:"Botica da Fabi",customer_name:String(customer.name).slice(0,100),customer_phone:String(customer.phone).slice(0,30),customer_cep:String(customer.cep).slice(0,12),customer_address:String(customer.address+" "+customer.number+" "+(customer.complement||"")).slice(0,250),customer_city:String(customer.city).slice(0,100),customer_state:String(customer.state).slice(0,100)},
        back_urls:{success:siteUrl+"/catalogo.html?pagamento=sucesso",pending:siteUrl+"/catalogo.html?pagamento=pendente",failure:siteUrl+"/catalogo.html?pagamento=falhou"},
        auto_return:"approved",
        statement_descriptor:"BOTICA DA FABI"
      })
    });
    const data = await response.json();
    if (!response.ok || !data.init_point) {
      console.error("Mercado Pago preference error",response.status,JSON.stringify(data).slice(0,1000));
      return res.status(502).json({error:"Não foi possível iniciar o pagamento agora. Confira a configuração da conta Mercado Pago."});
    }
    return res.status(200).json({checkoutUrl:data.init_point,orderReference:externalReference});
  } catch (error) {
    console.error("Checkout error",error);
    return res.status(500).json({error:"Erro ao preparar o checkout. Tente novamente."});
  }
};
