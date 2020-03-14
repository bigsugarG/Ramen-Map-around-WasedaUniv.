package com.example.myapplication;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.GeolocationPermissions.Callback;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView webView1 = findViewById(R.id.webView1);
        webView1.getSettings().setJavaScriptEnabled(true);
        webView1.loadUrl("file:///android_asset/map_display.html");

        //位置情報有効化

        webView1.getSettings().setGeolocationEnabled(true);

        webView1.setWebChromeClient(new WebChromeClient(){

            @Override

            public void onGeolocationPermissionsShowPrompt(String origin, Callback callback){

                callback.invoke(origin, true, false);

            }

        });
    }


}
