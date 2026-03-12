import { auth } from "@/auth"

export default auth((req) => {
    // Protect the interview route
    if (!req.auth && req.nextUrl.pathname.startsWith("/interview")) {
        const newUrl = new URL("/auth/signin", req.nextUrl.origin)
        // Add ?callbackUrl=/interview so it redirects back after login
        newUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
        return Response.redirect(newUrl)
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
