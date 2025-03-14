package org.reactnativewebapis.webstorage

import android.content.Context.MODE_PRIVATE
import android.content.SharedPreferences
import androidx.core.content.edit
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class WebStorageModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    companion object {
        const val IS_TURBO_MODULE = false
        const val NAME = "RNWWebStorage"
    }

    private val sharedPreferences: SharedPreferences =
        reactApplicationContext.getSharedPreferences(
            reactApplicationContext.packageName,
            MODE_PRIVATE
        )

    override fun getName(): String = NAME

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun length(): Int = sharedPreferences.all.size

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun key(@Suppress("UNUSED_PARAMETER") index: Int): String? {
        // The order of the elements in `SharedPreferences` is not defined.
        // https://developer.android.com/reference/android/content/SharedPreferences#getAll()
        return null
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getItem(key: String): String? = sharedPreferences.getString(key, null)

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun setItem(key: String, value: String) {
        sharedPreferences.edit { putString(key, value) }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun removeItem(key: String) {
        sharedPreferences.edit { remove(key) }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun clear() {
        sharedPreferences.edit { clear() }
    }
}
