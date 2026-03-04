(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__d1542297._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/src/lib/prisma.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$2f$default$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/client/default.js [middleware-edge] (ecmascript)");
;
const globalForPrisma = /*TURBOPACK member replacement*/ __turbopack_context__.g;
const prisma = globalForPrisma.prisma || new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$2f$default$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PrismaClient"]({
    log: [
        "query"
    ]
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/src/auth.config.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next-auth/providers/credentials.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/@auth/core/providers/credentials.js [middleware-edge] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])({
            async authorize (credentials) {
                // Validation logic will be implemented in auth.ts (non-edge)
                return null;
            }
        })
    ]
};
}),
"[project]/ [middleware-edge] (unsupported edge import 'crypto', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`crypto`));
}),
"[project]/src/auth.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "auth",
    ()=>auth,
    "signIn",
    ()=>signIn,
    "signOut",
    ()=>signOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next-auth/index.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$prisma$2d$adapter$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@auth/prisma-adapter/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/auth.config.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [middleware-edge] (ecmascript) <export * as z>");
;
;
;
;
;
;
const { handlers: { GET, POST }, auth, signIn, signOut } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])({
    adapter: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$prisma$2d$adapter$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PrismaAdapter"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["prisma"]),
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/auth/login"
    },
    callbacks: {
        async session ({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role;
            }
            return session;
        },
        async jwt ({ token }) {
            if (!token.sub) return token;
            const existingUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
                where: {
                    id: token.sub
                }
            });
            if (!existingUser) return token;
            token.role = existingUser.role;
            return token;
        }
    },
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"],
    providers: [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].providers.filter((p)=>p.id !== "credentials"),
        {
            id: "credentials",
            name: "Credentials",
            type: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize (credentials) {
                const validatedFields = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
                    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email(),
                    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)
                }).safeParse(credentials);
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
                        where: {
                            email
                        }
                    });
                    if (!user || !user.password) return null;
                    const passwordsMatch = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].compare(password, user.password);
                    if (passwordsMatch) return user;
                }
                return null;
            }
        }
    ]
});
}),
"[project]/messages/ar.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"Admin":{"nav":{"dashboard":"نظرة عامة","subjects":"إدارة المواد","analytics":"تحليلات الأداء","students":"دليل الطلاب","settings":"إعدادات النظام","logout":"خروج"},"stats":{"total_students":"إجمالي الطلاب","total_quizzes":"إجمالي الاختبارات","avg_score":"متوسط الدرجات","challenging_subject":"المادة الأكثر صعوبة"},"subjects":{"title":"إدارة المواد","add_new":"إضافة مادة جديدة","edit":"تعديل المادة","delete":"حذف","status":"الحالة","actions":"الإجراءات","name_en":"الاسم (بالإنجليزي)","name_ar":"الاسم (بالعربي)","save":"حفظ المادة","cancel":"إلغاء","confirm_delete":"هل أنت متأكد من رغبتك في حذف هذه المادة؟"},"analytics":{"title":"تحليلات أداء الطلاب","filters":{"student_name":"اسم الطالب","subject":"المادة","all_subjects":"كل المواد","score_range":"نطاق الدرجات","date":"من تاريخ"},"table":{"student":"الطالب","subject":"المادة","score":"الدرجة","date":"التاريخ","details":"التفاصيل"}}},"Navigation":{"home":"الرئيسية","diagnostic":"التقييم التشخيصي","dashboard":"لوحة التحكم","subjects":"المواد الدراسية"},"Index":{"title":"SmartPath AI","description":"منصة تعليمية مدعومة بالذكاء الاصطناعي لمسارات التعلم الشخصية."},"Auth":{"login":"تسجيل الدخول","signup":"إنشاء حساب","email":"البريد الإلكتروني","password":"كلمة المرور","logout":"تسجيل الخروج"},"Landing":{"title":"SmartPath AI","description":"رفيقك التعليمي المخصص والمدعوم بالذكاء الاصطناعي. أتقن موادك من خلال مسارات ديناميكية وتوجيهات الخبراء.","cta":"ابدأ التقييم التشخيصي الخاص بك","cta_desc":"دع ذكاؤنا الاصطناعي يفهم نقاط قوتك وضعفك لبناء خارطة طريق دراسية مثالية لك.","begin":"ابدأ الآن","coming_soon":"قريباً","subjects":{"math":"الرياضيات","physics":"الفيزياء","biology":"الأحياء","chemistry":"الكيمياء","english":"اللغة الإنجليزية","specialization":"معلومات التخصص جاهزة"}},"Language":{"switcher":"اللغة"}});}),
"[project]/messages/en.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"Admin":{"nav":{"dashboard":"Overview","subjects":"Subject Management","analytics":"Performance Analytics","students":"Student Directory","settings":"System Settings","logout":"Exit Portal"},"stats":{"total_students":"Total Students","total_quizzes":"Total Quizzes","avg_score":"Average Score","challenging_subject":"Challenging Subject"},"subjects":{"title":"Subject Management","add_new":"Add New Subject","edit":"Edit Subject","delete":"Delete","status":"Status","actions":"Actions","name_en":"Name (English)","name_ar":"Name (Arabic)","save":"Save Subject","cancel":"Cancel","confirm_delete":"Are you sure you want to delete this subject?"},"analytics":{"title":"Student Performance Analytics","filters":{"student_name":"Student Name","subject":"Subject","all_subjects":"All Subjects","score_range":"Score Range","date":"From Date"},"table":{"student":"Student","subject":"Subject","score":"Score","date":"Date","details":"Details"}}},"Navigation":{"home":"Home","diagnostic":"Diagnostic","dashboard":"Dashboard","subjects":"Subjects"},"Index":{"title":"SmartPath AI","description":"AI-powered educational platform for personalized learning paths."},"Auth":{"login":"Login","signup":"Sign Up","email":"Email","password":"Password","logout":"Logout"},"Landing":{"title":"SmartPath AI","description":"Your personalized AI-driven learning companion. Master your subjects with dynamic paths and expert guidance.","cta":"Start Your Diagnostic Assessment","cta_desc":"Let our AI understand your strengths and weaknesses to build your perfect study roadmap.","begin":"Begin Now","coming_soon":"Coming Soon","subjects":{"math":"Math","physics":"Physics","biology":"Biology","chemistry":"Chemistry","english":"English","specialization":"Specialization info ready"}},"Language":{"switcher":"Language"}});}),
"[project]/src/i18n.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "locales",
    ()=>locales
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__getRequestConfig$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/server/react-server/getRequestConfig.js [middleware-edge] (ecmascript) <export default as getRequestConfig>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/navigation.react-server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/navigation.react-server.js [middleware-edge] (ecmascript)");
;
;
const locales = [
    "en",
    "ar"
];
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__getRequestConfig$3e$__["getRequestConfig"])(async ({ locale })=>{
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale)) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["notFound"])();
    return {
        locale,
        messages: (await __turbopack_context__.f({
            "../messages/ar.json": {
                id: ()=>"[project]/messages/ar.json (json)",
                module: ()=>Promise.resolve().then(()=>__turbopack_context__.i("[project]/messages/ar.json (json)"))
            },
            "../messages/en.json": {
                id: ()=>"[project]/messages/en.json (json)",
                module: ()=>Promise.resolve().then(()=>__turbopack_context__.i("[project]/messages/en.json (json)"))
            }
        }).import(`../messages/${locale}.json`)).default
    };
});
}),
"[project]/src/navigation.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Link",
    ()=>Link,
    "redirect",
    ()=>redirect,
    "routing",
    ()=>routing,
    "usePathname",
    ()=>usePathname,
    "useRouter",
    ()=>useRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$server$2f$createNavigation$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__createNavigation$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/navigation/react-server/createNavigation.js [middleware-edge] (ecmascript) <export default as createNavigation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/routing/defineRouting.js [middleware-edge] (ecmascript) <export default as defineRouting>");
;
;
const routing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__["defineRouting"])({
    locales: [
        "en",
        "ar"
    ],
    defaultLocale: "en"
});
const { Link, redirect, usePathname, useRouter } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$server$2f$createNavigation$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__createNavigation$3e$__["createNavigation"])(routing);
}),
"[project]/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/middleware/middleware.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/auth.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$navigation$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/navigation.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
;
;
;
const intlMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$navigation$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["routing"]);
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["auth"])((req)=>{
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isApiRoute = nextUrl.pathname.startsWith("/api");
    const isAuthRoute = nextUrl.pathname.includes("/auth");
    const isAdminRoute = nextUrl.pathname.includes("/admin");
    // Handle i18n for non-API routes
    if (!isApiRoute) {
        const response = intlMiddleware(req);
        // Protection logic
        if (isAdminRoute && req.auth?.user?.role !== "ADMIN") {
            // If not admin, redirect to dashboard or home
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/", nextUrl));
        }
        if (isAuthRoute && isLoggedIn) {
            // If logged in, don't allow access to login/signup
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/", nextUrl));
        }
        return response;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
});
const config = {
    // Matcher for i18n and Auth
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
        "/(ar|en)/:path*",
        "/admin/:path*"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__d1542297._.js.map