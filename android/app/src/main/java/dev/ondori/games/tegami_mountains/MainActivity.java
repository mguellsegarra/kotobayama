package dev.ondori.games.tegami_mountains;

import com.facebook.react.ReactActivity;
import android.content.pm.ActivityInfo;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
    }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "tegami_mountains";
  }
}
