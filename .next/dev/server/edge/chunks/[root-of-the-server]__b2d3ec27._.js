(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__b2d3ec27._.js",
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
    "auth",
    ()=>auth,
    "handlers",
    ()=>handlers,
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
const { handlers, auth, signIn, signOut } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])({
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

__turbopack_context__.v(JSON.parse("{\"Admin\":{\"nav\":{\"dashboard\":\"نظرة عامة\",\"subjects\":\"إدارة المواد\",\"analytics\":\"تحليلات الأداء\",\"students\":\"دليل الطلاب\",\"settings\":\"إعدادات النظام\",\"logout\":\"خروج\"},\"stats\":{\"total_students\":\"إجمالي الطلاب\",\"total_quizzes\":\"إجمالي الاختبارات\",\"avg_score\":\"متوسط الدرجات\",\"challenging_subject\":\"المادة الأكثر صعوبة\"},\"subjects\":{\"title\":\"إدارة المواد\",\"add_new\":\"إضافة مادة جديدة\",\"edit\":\"تعديل المادة\",\"delete\":\"حذف\",\"status\":\"الحالة\",\"actions\":\"الإجراءات\",\"name_en\":\"الاسم (بالإنجليزي)\",\"name_ar\":\"الاسم (بالعربي)\",\"desc_en\":\"الوصف (بالإنجليزي)\",\"desc_ar\":\"الوصف (بالعربي)\",\"is_enabled\":\"نشط\",\"save\":\"حفظ المادة\",\"cancel\":\"إلغاء\",\"confirm_delete\":\"هل أنت متأكد من رغبتك في حذف هذه المادة؟\"},\"analytics\":{\"title\":\"تحليلات أداء الطلاب\",\"filters\":{\"student_name\":\"اسم الطالب\",\"subject\":\"المادة\",\"all_subjects\":\"كل المواد\",\"score_range\":\"نطاق الدرجات\",\"date\":\"من تاريخ\"},\"table\":{\"student\":\"الطالب\",\"subject\":\"المادة\",\"score\":\"الدرجة\",\"date\":\"التاريخ\",\"details\":\"التفاصيل\"}},\"analytics_detail\":{\"title\":\"تحليل التسليم\",\"student_info\":\"معلومات الطالب\",\"performance\":\"الأداء\",\"ai_analysis\":\"تقييم الذكاء الاصطناعي\",\"roadmap\":\"خارطة طريق التعلم\",\"recommendations\":\"التوصيات\",\"summary\":\"ملخص\",\"back\":\"العودة إلى التحليلات\",\"not_found\":\"التسليم غير موجود\"}},\"Navigation\":{\"home\":\"الرئيسية\",\"diagnostic\":\"التقييم التشخيصي\",\"dashboard\":\"لوحة التحكم\",\"subjects\":\"المواد الدراسية\",\"login\":\"تسجيل الدخول\"},\"Index\":{\"title\":\"SmartPath AI\",\"description\":\"منصة تعليمية مدعومة بالذكاء الاصطناعي لمسارات التعلم الشخصية.\"},\"Auth\":{\"login\":\"تسجيل الدخول\",\"signup\":\"إنشاء حساب\",\"email\":\"البريد الإلكتروني\",\"password\":\"كلمة المرور\",\"logout\":\"تسجيل الخروج\",\"no_account\":\"ليس لديك حساب؟\",\"have_account\":\"لديك حساب بالفعل؟\",\"login_title\":\"مرحباً بعودتك\",\"description\":\"الوصول إلى مسار التعلم المخصص الخاص بك\",\"signup_title\":\"انضم إلى SmartPath AI\",\"signup_desc\":\"ابدأ رحلتك التعليمية المستقبلية\",\"student_role\":\"طالب\",\"admin_role\":\"مسؤول\",\"role_select\":\"اختر دورك\"},\"Landing\":{\"title_main\":\"أتقن أي شيء.\",\"title_ai\":\"بذكاء اصطناعي.\",\"badge_new\":\"تعليم الجيل القادم\",\"description\":\"رفيقك التعليمي المخصص والمدعوم بالذكاء الاصطناعي. أتقن موادك من خلال مسارات ديناميكية وتوجيهات الخبراء.\",\"cta\":\"ابدأ التقييم التشخيصي الخاص بك\",\"cta_desc\":\"دع ذكاؤنا الاصطناعي يفهم نقاط قوتك وضعفك لبناء خارطة طريق دراسية مثالية لك.\",\"begin\":\"ابدأ الآن\",\"coming_soon\":\"قريباً\",\"academic_subjects\":\"المواد الأكاديمية\",\"select_material\":\"اختر مادة لمعاينة التخصصات\",\"future_path_cta\":\"هل أنت مستعد لاكتشاف مسارك المستقبلي؟\",\"diagnostic_title\":\"التقييم التشخيصي\",\"diagnostic_desc\":\"ركز جيداً: يرجى الإجابة على الأسئلة التالية بدقة للحصول على أفضل النتائج.\",\"stats\":{\"precision\":\"دقة 98%\",\"optimized\":\"محسن بالذكاء الاصطناعي\",\"ranked\":\"المرتبة الأولى\"},\"subjects\":{\"math\":\"الرياضيات\",\"physics\":\"الفيزياء\",\"biology\":\"الأحياء\",\"chemistry\":\"الكيمياء\",\"english\":\"اللغة الإنجليزية\",\"specialization\":\"معلومات التخصص جاهزة\",\"active_curriculum\":\"المنهج النشط\",\"math_desc\":\"حساب التفاضل والتكامل المتقدم والجبر والهندسة للتحضير الجامعي.\",\"math_topics\":[\"التفاضل والتكامل\",\"الجبر الخططي\",\"الأعداد المركبة\",\"الهندسة\"],\"physics_desc\":\"الديناميكا الحرارية والميكانيكا وخصائص الموجات في الفيزياء الحديثة.\",\"physics_topics\":[\"الميكانيكا\",\"الكهرباء\",\"الفيزياء النووية\",\"الموجات\"],\"biology_desc\":\"تكاثر الخلايا وعلم الوراثة وديناميكيات النظام البيئي.\",\"biology_topics\":[\"علم الوراثة\",\"البيئة\",\"بنية الخلية\",\"تشريح الإنسان\"],\"chemistry_desc\":\"المركبات العضوية ومعدل التفاعلات والاتزان الكيميائي.\",\"chemistry_topics\":[\"الكيمياء العضوية\",\"الديناميكا الحرارية\",\"الترابط\",\"الحساب الكيميائي\"],\"english_desc\":\"التحليل الأدبي والقواعد المتقدمة والكتابة الأكاديمية.\",\"english_topics\":[\"التحليل\",\"القواعد\",\"التأليف\",\"الشعر\"],\"start_assessment\":\"بدء التقييم\",\"about\":\"حول هذه المادة\",\"curriculum\":\"المنهج الأساسي\"},\"features\":{\"title\":\"ميزات ذكية\",\"subtitle\":\"كل ما تحتاجه للنجاح\",\"roadmap\":{\"title\":\"خرائط طريق ديناميكية\",\"desc\":\"خطط دراسية تم إنشؤها بوساطة الذكاء الاصطناعي تتكيف مع تقدمك.\"},\"analytics_feat\":{\"title\":\"تحليلات عميقة\",\"desc\":\"تصور نموك وحدد الفجوات في الوقت الفعلي.\"},\"predictor_feat\":{\"title\":\"متنبئ التخصص\",\"desc\":\"توصيات جامعية علمية بناءً على أدائك.\"}}},\"Language\":{\"switcher\":\"اللغة\"},\"Common\":{\"welcome\":\"مرحباً\",\"loading\":\"جاري التحميل...\",\"na\":\"غير متوفر\"},\"Predictor\":{\"title\":\"متنبئ التخصص الجامعي\",\"description\":\"يقوم الذكاء الاصطناعي لدينا بتحليل مقاييس أدائك لاكتشاف مستقبلك الأكاديمي المثالي.\",\"analyze\":\"تحليل الأداء\",\"calculating\":\"جاري تحليل النتائج...\",\"match_score\":\"درجة المطابقة\",\"careers\":\"المسارات المهنية المحتملة\",\"explanation\":\"لماذا هذا التخصص؟\",\"no_data\":\"نحتاج إلى مزيد من البيانات للتنبؤ بمستقبلك. يرجى إكمال المزيد من الاختبارات التشخيصية!\",\"take_quiz\":\"بدء التشخيص\",\"engine_badge\":\"محرك المستقبل AI\",\"observation_required\":\"مطلوب الملاحظة\",\"subjects_required\":\"يتطلب التنبؤ الوظيفي بيانات من 3 مواد مختلفة على الأقل.\",\"last_updated\":\"آخر تحديث\",\"refresh_btn\":\"تحديث تحليل الذكاء الاصطناعي\",\"rerun_btn\":\"إعادة التحليل\"},\"Profile\":{\"title\":\"ملفك الشخصي\",\"history\":\"سجل التقييمات\",\"no_history\":\"لا توجد تقييمات بعد.\",\"no_assessments\":\"لا توجد تقييمات بعد.\",\"edit\":\"تعديل الملف\",\"logout\":\"تسجيل الخروج\",\"view_path\":\"عرض المسار\",\"details\":\"تفاصيل الحساب\",\"name\":\"الاسم الكامل\",\"email\":\"البريد الإلكتروني\",\"role\":\"الدور\",\"stats_total\":\"الإجمالي\",\"start_quiz_cta\":\"ابدأ أول اختبار\",\"student_fallback\":\"طالب\",\"view_details\":\"عرض النتائج\",\"view_roadmap\":\"عرض الخارطة\",\"score_label\":\"الدرجة\",\"no_roadmap\":\"لا يوجد خارطة\",\"settings\":\"إعدادات الحساب\",\"admin_info_title\":\"حساب المسؤول\",\"admin_info_desc\":\"لقد قمت بتسجيل الدخول بصلاحيات إدارية. يرجى استخدام بوابة المسؤول لإدارة بيانات المنصة والطلاب وإعدادات النظام.\",\"back_to_admin\":\"الانتقال إلى بوابة المسؤول\"},\"Dashboard\":{\"welcome_back\":\"مرحباً بعودتك\",\"active_paths\":\"مسارات التعلم النشطة\",\"continue_path\":\"متابعة المسار\",\"no_active_paths\":\"لا توجد مسارات نشطة بعد\",\"no_active_paths_desc\":\"أكمل اختباراً تشخيصياً لإنشاء أول خارطة طريق دراسية مدعومة بالذكاء الاصطناعي.\",\"take_diagnostic\":\"بدء التقييم\",\"major_predictor_title\":\"متنبئ التخصص\",\"major_predictor_desc\":\"دع الذكاء الاصطناعي يحلل أداءك العام لاكتشاف أفضل تخصص جامعي لك.\",\"progress_to_unlock\":\"التقدم لفتح الميزة\",\"open_predictor\":\"فتح متنبئ الذكاء الاصطناعي\",\"assessment_history\":\"سجل التقييمات\"},\"Results\":{\"title\":\"نتائج التقييم\",\"complete_badge\":\"اكتمل التقييم\",\"score_label\":\"الدرجة\",\"excellent_msg\":\"عمل رائع! لديك فهم قوي للأساسيات. ستتركز خارطة الطريق الخاصة بك على التطبيق المتقدم.\",\"good_msg\":\"بداية جيدة! لقد حددنا بعض الفجوات المعرفية. ستعمل خارطة الطريق المخصصة لك على تقوية أساسياتك.\",\"view_path\":\"عرض مساري التعليمي SmartPath\",\"try_another\":\"تجربة مادة أخرى\",\"breakdown\":\"تفاصيل الأسئلة\",\"correct\":\"صحيح\",\"incorrect\":\"خطأ\"},\"Diagnostic\":{\"title\":\"قياس\",\"generating\":\"جاري تحضير الأسئلة...\",\"subject_label\":\"المادة\",\"of_questions\":\"من {total} أسئلة\",\"subjects_count\":\"{current} / {total} مواد\",\"excellent_job\":\"رائع! تم إكمال المادة\",\"ready_for_next\":\"أنت مستعد للمادة التالية\",\"next_subject_btn\":\"المادة التالية\",\"awesome_complete\":\"تهانينا! اكتمل التقييم\",\"analyzing_results_desc\":\"يقوم ذكاؤنا الاصطناعي الآن بتحليل نتائجك لإنشاء مسارك التعليمي SmartPath\",\"view_path_btn\":\"عرض مساري التعليمي SmartPath\",\"stage_1_badge\":\"الخطوة الأولى: التقييم\",\"selection_title\":\"اختر مادتك\",\"selection_desc\":\"اختر مادة لبدء التقييم التشخيصي وفتح خارطة الطريق المدعومة بالذكاء الاصطناعي.\",\"start_btn\":\"ابدأ التقييم\",\"restricted_title\":\"الوصول مقيد\",\"restricted_desc\":\"لا يمكن للمسؤولين إجراء الاختبارات التشخيصية.\",\"restricted_back\":\"العودة إلى بوابة المسؤول\"}}"));}),
"[project]/messages/en.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"Admin":{"nav":{"dashboard":"Overview","subjects":"Subject Management","analytics":"Performance Analytics","students":"Student Directory","settings":"System Settings","logout":"Exit Portal"},"stats":{"total_students":"Total Students","total_quizzes":"Total Quizzes","avg_score":"Average Score","challenging_subject":"Challenging Subject"},"subjects":{"title":"Subject Management","add_new":"Add New Subject","edit":"Edit Subject","delete":"Delete","status":"Status","actions":"Actions","name_en":"Name (English)","name_ar":"Name (Arabic)","desc_en":"Description (English)","desc_ar":"Description (Arabic)","is_enabled":"Active","save":"Save Subject","cancel":"Cancel","confirm_delete":"Are you sure you want to delete this subject?"},"analytics":{"title":"Student Performance Analytics","filters":{"student_name":"Student Name","subject":"Subject","all_subjects":"All Subjects","score_range":"Score Range","date":"From Date"},"table":{"student":"Student","subject":"Subject","score":"Score","date":"Date","details":"Details"}},"analytics_detail":{"title":"Submission Analysis","student_info":"Student Information","performance":"Performance","ai_analysis":"AI Assessment","roadmap":"Learning Roadmap","recommendations":"Recommendations","summary":"Summary","back":"Back to Analytics","not_found":"Submission not found"}},"Navigation":{"home":"Home","diagnostic":"Diagnostic","dashboard":"Dashboard","subjects":"Subjects","login":"Login"},"Index":{"title":"SmartPath AI","description":"AI-powered educational platform for personalized learning paths."},"Auth":{"login":"Login","signup":"Sign Up","email":"Email Address","password":"Password","logout":"Logout","no_account":"Don't have an account?","have_account":"Already have an account?","login_title":"Welcome Back","description":"Access your personalized learning path","signup_title":"Join SmartPath AI","signup_desc":"Begin your futuristic learning journey","student_role":"Student","admin_role":"Administrator","role_select":"Select your Role"},"Landing":{"title_main":"Master Anything.","title_ai":"AI Powered.","badge_new":"Next-Gen Education","description":"Your personalized AI-driven learning companion. Master your subjects with dynamic paths and expert guidance.","cta":"Start Your Diagnostic Assessment","cta_desc":"Let our AI understand your strengths and weaknesses to build your perfect study roadmap.","begin":"Begin Now","coming_soon":"Coming Soon","academic_subjects":"Academic Subjects","select_material":"Select a material to preview specializations","future_path_cta":"Ready to discover your future path?","diagnostic_title":"Diagnostic Assessment","diagnostic_desc":"Focus Mode: Please complete the following questions as accurately as possible to build your roadmap.","stats":{"precision":"98% Precision","optimized":"AI Optimized","ranked":"Ranked #1"},"subjects":{"math":"Math","physics":"Physics","biology":"Biology","chemistry":"Chemistry","english":"English","specialization":"Specialization info ready","active_curriculum":"Active Curriculum","math_desc":"Advanced calculus, algebra, and geometry for university preparation.","math_topics":["Calculus","Linear Algebra","Complex Numbers","Geometry"],"physics_desc":"Thermodynamics, mechanics, and wave properties in modern physics.","physics_topics":["Mechanics","Electricity","Nuclear Physics","Waves"],"biology_desc":"Cell reproduction, genetics, and ecosystem dynamics.","biology_topics":["Genetics","Ecology","Cell Structure","Human Anatomy"],"chemistry_desc":"Organic compounds, rate of reactions, and chemical equilibrium.","chemistry_topics":["Organic Chemistry","Thermodynamics","Bonding","Stoichiometry"],"english_desc":"Literary analysis, advanced grammar, and academic writing.","english_topics":["Analysis","Grammar","Composition","Poetry"],"start_assessment":"Start Assessment","about":"About this Subject","curriculum":"Core Curriculum"},"features":{"title":"Future Features","subtitle":"Everything you need to succeed","roadmap":{"title":"Dynamic Roadmaps","desc":"AI-generated study plans that adapt to your progress."},"analytics_feat":{"title":"Deep Analytics","desc":"Visualize your growth and identify gaps in real-time."},"predictor_feat":{"title":"Major Predictor","desc":"Scientific university recommendations based on your performance."}}},"Language":{"switcher":"Language"},"Common":{"welcome":"Welcome","loading":"Loading...","na":"N/A"},"Predictor":{"title":"University Major Predictor","description":"Our AI analyzes your performance metrics to discover your ideal academic future.","analyze":"Analyze Performance","calculating":"Analyzing Results...","match_score":"Match Score","careers":"Potential Career Paths","explanation":"Why this major?","no_data":"We need more data to predict your future. Please complete more diagnostic quizzes!","take_quiz":"Start Diagnostic","engine_badge":"AI Future Engine","observation_required":"Observation Required","subjects_required":"Career prediction requires data from at least 3 different subjects.","last_updated":"Last Updated","refresh_btn":"Refresh AI Analysis","rerun_btn":"Rerun Analysis"},"Profile":{"title":"Your Profile","history":"Assessment History","no_history":"No assessments yet.","no_assessments":"No assessments yet.","edit":"Edit Profile","logout":"Logout","view_path":"View Path","details":"Account Details","name":"Full Name","email":"Email Address","role":"Role","stats_total":"Total","start_quiz_cta":"Start First Quiz","student_fallback":"Student","view_details":"View Results","view_roadmap":"View Roadmap","score_label":"Score","no_roadmap":"No Roadmap","settings":"Account Settings","admin_info_title":"Administrator Account","admin_info_desc":"You are logged in with administrative privileges. Please use the Admin Portal to manage the platform's data, students, and system settings.","back_to_admin":"Go to Admin Portal"},"Dashboard":{"welcome_back":"Welcome back","active_paths":"Active Learning Paths","continue_path":"Continue Path","no_active_paths":"No active paths yet","no_active_paths_desc":"Complete a diagnostic quiz to generate your first AI-powered roadmap.","take_diagnostic":"Take Diagnostic","major_predictor_title":"Major Predictor","major_predictor_desc":"Let AI analyze your overall performance to discover the best university major for you.","progress_to_unlock":"Progress to Unlock","open_predictor":"Open AI Predictor","assessment_history":"Assessment History"},"Results":{"title":"Assessment Results","complete_badge":"Assessment Complete","score_label":"Score","excellent_msg":"Excellent work! You have a strong grasp of the fundamentals. Your roadmap will focus on advanced application.","good_msg":"A good start! We've identified some knowledge gaps. Your personalized roadmap will strengthen your foundations.","view_path":"View My SmartPath","try_another":"Try Another Subject","breakdown":"Question Breakdown","correct":"Correct","incorrect":"Incorrect"},"Diagnostic":{"title":"Diagnostic","generating":"Generating your questions...","subject_label":"Subject","of_questions":"of {total} Questions","subjects_count":"{current} / {total} Subjects","excellent_job":"Great Job! Subject Completed","ready_for_next":"You're ready for the next subject","next_subject_btn":"Continue to Next Subject","awesome_complete":"Awesome! Assessment Complete","analyzing_results_desc":"Our AI is analyzing your performance to generate your unique SmartPath.","view_path_btn":"View My SmartPath","stage_1_badge":"Step 1: Evaluation","selection_title":"Choose Your Subject","selection_desc":"Select a subject to begin your diagnostic assessment and unlock your AI-powered roadmap.","start_btn":"Start Assessment","restricted_title":"Access Restricted","restricted_desc":"Administrators cannot take diagnostic quizzes.","restricted_back":"Back to Admin Portal"}});}),
"[project]/src/i18n/request.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__getRequestConfig$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/server/react-server/getRequestConfig.js [middleware-edge] (ecmascript) <export default as getRequestConfig>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$navigation$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/navigation.ts [middleware-edge] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__getRequestConfig$3e$__["getRequestConfig"])(async ({ requestLocale })=>{
    let locale = await requestLocale;
    // Validate that the incoming `locale` parameter is valid
    if (!locale || !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$navigation$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["routing"].locales.includes(locale)) {
        locale = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$navigation$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["routing"].defaultLocale;
    }
    return {
        locale,
        messages: (await __turbopack_context__.f({
            "../../messages/ar.json": {
                id: ()=>"[project]/messages/ar.json (json)",
                module: ()=>Promise.resolve().then(()=>__turbopack_context__.i("[project]/messages/ar.json (json)"))
            },
            "../../messages/en.json": {
                id: ()=>"[project]/messages/en.json (json)",
                module: ()=>Promise.resolve().then(()=>__turbopack_context__.i("[project]/messages/en.json (json)"))
            }
        }).import(`../../messages/${locale}.json`)).default
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
    defaultLocale: "en",
    localePrefix: "always"
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
const intlMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])({
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$navigation$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["routing"],
    defaultLocale: "en"
});
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["auth"])((req)=>{
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    // Run intl-middleware first to detect/set locale
    const response = intlMiddleware(req);
    // Extract locale from the response or the requested URL
    // next-intl middleware might have added a locale prefix or cookie
    const pathname = nextUrl.pathname;
    const pathnameParts = pathname.split("/");
    const locale = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$navigation$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["routing"].locales.includes(pathnameParts[1]) ? pathnameParts[1] : "en";
    const localizedBase = `/${locale}`;
    const isApiRoute = pathname.startsWith("/api");
    const isAuthRoute = pathname.includes("/auth");
    const isAdminRoute = pathname.includes("/admin");
    if (isApiRoute) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    const isProtectedRoute = pathname.includes("/profile") || pathname.includes("/diagnostic") || pathname.includes("/dashboard") || pathname.includes("/path") || pathname.includes("/predictor");
    // Protection logic
    if (isProtectedRoute && !isLoggedIn) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(`${localizedBase}/auth/login`, nextUrl));
    }
    if (isAdminRoute && req.auth?.user?.role !== "ADMIN") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(localizedBase, nextUrl));
    }
    if (isAuthRoute && isLoggedIn) {
        const role = req.auth?.user?.role;
        const target = role === "ADMIN" ? "/admin" : "/dashboard";
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(`${localizedBase}${target}`, nextUrl));
    }
    return response;
});
const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
        "/(ar|en)/:path*",
        "/admin/:path*"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__b2d3ec27._.js.map