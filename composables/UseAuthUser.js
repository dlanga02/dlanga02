import { ref } from 'vue'
import useSupabase from 'boot/supabase'

/**
 * Função genérica para comunicação com Supabase e realização de autenticação
 */

// https://supabase.com/docs/reference/javascript/upgrade-guidehttps://supabase.com/docs/reference/javascript/upgrade-guide

// o usuário é definido fora da função useAuthUser para que atue como um estado global
// e sempre se refira a um único usuário
const user = ref(null)

export default function useAuthUser () {
  const { supabase } = useSupabase()

  /**
   * Login with email and password
   */
  const login = async ({ email, password }) => {
    // const { user, error } = await supabase.auth.signIn({ email, password })  V1
    const { user, error } = await supabase.auth.signInWithPassword({ email, password }) // V2
    if (error) throw error
    return user
  }

  /**
   * Login with google, github, etc
   */
  const loginWithSocialProvider = async (provider) => {
    const { user, error } = await supabase.auth.signInWithOAuth({ provider })
    if (error) throw error
    return user
  }

  /**
   * Logout
   */
  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  /**
   * Check if the user is logged in or not
   */
  const isLoggedIn = () => {
    return !!user.value
  }

  /**
   * Register
   */
  const register = async ({ email, password, ...meta }) => {
    const { user, error } = await supabase.auth.signUp(
      { email, password },
      {
        data: meta,
        redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`
      })
    if (error) throw error
    return user
  }

  /**
   * Update user email, password, or meta data
   */
  const update = async (data) => {
    const { user, error } = await supabase.auth.update(data)
    if (error) throw error
    return user
  }

  /**
   * Send user an email to reset their password
   * (ie. support "Forgot Password?")
   */
  const sendPasswordRestEmail = async (email) => {
    const { user, error } = await supabase.auth.api.resetPasswordForEmail(email)
    if (error) throw error
    return user
  }

  const resetPassword = async (accessToken, newPassword) => {
    const { user, error } = await supabase.auth.api.updateUser(
      accessToken,
      { password: newPassword }
    )
    if (error) throw error
    return user
  }

  return {
    user,
    login,
    loginWithSocialProvider,
    isLoggedIn,
    logout,
    register,
    update,
    sendPasswordRestEmail,
    resetPassword
  }
}
