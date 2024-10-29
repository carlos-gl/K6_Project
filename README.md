# Projeto de Teste de Carga com K6

Este projeto utiliza o K6 para realizar testes de carga em uma API pública, simulando 500 usuários simultâneos durante 5 minutos. O resultado do teste pode ser visualizado em um relatório HTML, e as métricas podem ser monitoradas em tempo real usando o Grafana e InfluxDB via Docker.

## Requisitos

- **Node.js** e **npm** instalados para utilizar o K6
- **Docker** e **Docker Compose** para execução do InfluxDB e Grafana

## Configuração do Projeto

1. **Instalar o K6**
   ```choco install k6``` ou   ```brew install k6```

### Clonando o Repositório
```
git clone https://github.com/carlos-gl/K6_Project.git
```
Utilize sua IDE de preferência para executar o projeto (Sugetão: Visual Studio Code).

#### O mesmo também é executado através do github actions, está configurado para rodar a esteira a cada commit, e após execução gera o artefato com os resultados

#### Também pode ser acompanhado os resultados em tempo real localmente pelo grafana.
- Para isso subir os containers ```docker-compose up -d```
- Acessar o grafana localmente `localhost:3000` fazer login com user`admin` e senha `admin`
- E adicionar o datasource influxDB que é onde está sendo armazenado os dados gerados
- Após isso ir até o dashboard do grafana e visualizar os resultados
- Executar o comando: `k6 run --out influxdb=http://localhost:8086/k6 script.js`
 ![image](https://github.com/user-attachments/assets/abc0d9f4-babc-4b3c-a374-4552fedda7a2)
- Aqui temos mais alguns resultados após conclusão da execução:
 ![image](https://github.com/user-attachments/assets/03660961-7716-4aa2-adec-7960a5b7a8b8)
- Dessas 1271 falhas, 7 foram de respostas que falharam e 1264 foram de tempos maiores que o esperado para retornar uma resposta:
 ![image](https://github.com/user-attachments/assets/55508dfd-6e2d-4344-ac12-3e8089aefa11)
