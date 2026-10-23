# CAVEMAN HANDOFF v1

APP: Botica da Fabi — landing page de vendas de cosméticos
WORKSTREAM: Atualização da landing page + publicação GitHub Pages
STATE: Landing page atualizada no remoto; workflow Pages para o HEAD mais recente está na fila.
MODE: WATCH
CANONICAL SOURCE: https://github.com/boticadafabi/boticadafabi

CURRENT VERSION / HEAD: `1a239110b045ecdf53c4da110f367840c3743f3c`
BASE: `main`
BRANCH / ENV: `main`; GitHub Pages
PR / MR / TASK: Nenhum PR ou issue aberta observado na última reconciliação.
SPEC / ADR: `README.md`; este handoff.

DONE:
- Landing page comercial responsiva em `index.html` e `styles.css`, usando a logo existente `logo.svg`.
- Paleta branca, preta, bordô e verde claro; cantos arredondados, transições suaves, hero, marcas, experiência de compra, pagamento e CTA.
- Links dos catálogos fornecidos para Quem disse, Berenice?, O.U.I Paris, Eudora e O Boticário.
- CTA por marca e botões de pedido direcionam para WhatsApp da Fabi: +55 21 97002-3845.
- Formas de pagamento exibidas: cartão, PIX e dinheiro; condições orientadas a confirmar diretamente com a vendedora.
- Instagram @boticadafabi ligado no rodapé.
- Arquivos verificados no remoto: `index.html`, `styles.css`, `script.js`.

VERIFY:
- GitHub remoto confirmou os arquivos atualizados e HEAD `1a239110b045ecdf53c4da110f367840c3743f3c`.
- GitHub Actions Pages para esse HEAD estava `queued` na última consulta; runs intermediárias dos commits anteriores foram canceladas, não falharam em build. A publicação do HEAD ainda não está verificada.
- Os links de catálogo foram preservados como fornecidos pelo usuário. Ferramenta de navegação não conseguiu carregar as URLs de redirecionamento para ler os preços; nenhum preço foi inventado.
- Site publicado não foi verificado visualmente nesta sessão.
- Interações dos CTAs usam links `wa.me` com mensagem pré-preenchida. Os links de catálogo abrem o site de cada marca.

GATES:
- Catálogos e preços atualizados devem ser conferidos nos portais de marca e confirmados com a Fabi antes do pagamento.
- Não mostrar preços específicos sem fonte verificável de catálogo atual.
- Antes de produção comercial: revisar imagens autorizadas, disponibilidade, entrega, política de troca, privacidade e identidade/uso de marcas.
- Não afirmar vínculo oficial com o Grupo Boticário.

BLOCKERS:
- Workflow Pages do HEAD atual ainda estava na fila na última verificação.
- Os portais de catálogo não puderam ser lidos pela ferramenta; não foi possível popular uma lista local completa de SKUs/preços. A página aponta para os catálogos vivos.
- Não há checkout/pagamento integrado: o fluxo é pedido e confirmação manual pelo WhatsApp.

INVARIANTS:
- VERIFY-FIRST; estado remoto vence handoff/chat.
- Nunca inventar preços, disponibilidade, descontos ou condições de pagamento.
- Não declarar publicação pronta sem run concluído e evidência de disponibilidade.
- Não introduzir processamento de pagamento; o WhatsApp é o canal de consulta/confirmação.

NEXT:
1. Verificar Actions até o workflow para `1a239110b045ecdf53c4da110f367840c3743f3c` terminar.
2. Se concluído com sucesso, testar URL Pages e os principais links/CTA; se falhar, inspecionar logs e corrigir a causa real.
3. Depois do deploy, continuar melhorias de conversão/acessibilidade sem remover as ressalvas de preços e catálogo.
4. Se usuário fornecer exportação/arquivo dos catálogos, estruturar a listagem com preços e atualizar a página sem dados inventados.

VERIFY-FIRST:
- Consultar HEAD atual de `main`, raiz do repositório, PRs/issues e `/actions/runs?per_page=10`.
- Acompanhar o workflow associado ao HEAD atual sem duplicar publicação.
- Verificar a URL publicada em navegador acessível; confirmar links de catálogo e wa.me.
- Só então reclassificar RESUME/WATCH/ADVANCE e atualizar este arquivo.
