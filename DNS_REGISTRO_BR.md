# DNS para Registro.br

Dominio principal planejado: `www.seg365.com.br`

## Registro para o subdominio www

Crie um registro:

| Tipo | Nome | Valor |
| --- | --- | --- |
| CNAME | www | marcosjantsch.github.io |

Importante: o valor do CNAME nao deve incluir `/seg365-site`.

## Registros para o dominio raiz

Para que `seg365.com.br` tambem funcione e redirecione para `www.seg365.com.br`,
crie os registros A abaixo no dominio raiz:

| Tipo | Nome | Valor |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Opcionalmente, se o DNS do Registro.br permitir IPv6, crie tambem:

| Tipo | Nome | Valor |
| --- | --- | --- |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |

## Depois de salvar no Registro.br

1. Aguarde a propagacao do DNS, que pode levar ate 24 horas.
2. Confirme se `www.seg365.com.br` resolve para o GitHub Pages.
3. Ative `Enforce HTTPS` em GitHub > repository `seg365-site` > Settings > Pages.
