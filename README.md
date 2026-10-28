# FAQ Webview

Página estática de dúvidas frequentes para embutir em apps Android.
HTML + CSS + JavaScript puro, sem dependências. Servida por um Spring Boot mínimo.

## Estrutura
- `src/main/resources/static/faq.json` — conteúdo (edite aqui perguntas e respostas)
- `src/main/resources/static/index.html | style.css | app.js` — interface

## Rodar local
    mvn spring-boot:run      # abre em http://localhost:8080

## Publicar no Azure App Service (igual às APIs)
1. Crie um novo App Service (Java 17, Java SE) para a webview.
2. `mvn clean package` gera `target/faq-webview-1.0.0.jar`.
3. Faça o deploy do .jar da mesma forma que fez com as APIs.
4. Teste a URL `https://<nome-do-app>.azurewebsites.net/` no navegador do celular.

## Parâmetros de URL (opcionais)
- `?tema=claro` ou `?tema=escuro` — força o tema (padrão: segue o celular)
- `?categoria=Reservas` — abre já filtrada (Reservas, Vagas ou Ajuda)
- Exemplo: `https://<app>.azurewebsites.net/?tema=escuro&categoria=Vagas`

## Integração Android (para a outra squad)
Permissão no `AndroidManifest.xml`:

    <uses-permission android:name="android.permission.INTERNET" />

Kotlin:

    val webView = findViewById<WebView>(R.id.webView)
    webView.settings.javaScriptEnabled = true
    webView.loadUrl("https://<nome-do-app>.azurewebsites.net/")

Layout:

    <WebView android:id="@+id/webView"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

## Observações
- O plano gratuito (F1) hiberna por inatividade: o primeiro acesso pode demorar alguns segundos. A página mostra "Carregando" e permite tentar de novo se falhar.
- Use sempre HTTPS (o azurewebsites.net já fornece).
- Para atualizar o conteúdo, altere o `faq.json` e publique de novo. O app deles não precisa de nova versão.
- Versão do conteúdo: 1.0.0
