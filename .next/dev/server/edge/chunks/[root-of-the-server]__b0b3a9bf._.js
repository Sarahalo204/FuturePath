(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__b0b3a9bf._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
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
                // Actual validation happens in auth.ts (non-edge).
                // This stub is required so Credentials provider is registered.
                return null;
            }
        })
    ],
    callbacks: {
        // These callbacks run in edge middleware and read the JWT token
        // set by the full auth.ts — no database access needed.
        async jwt ({ token }) {
            return token;
        },
        async session ({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role;
            }
            return session;
        },
        authorized ({ auth, request: { nextUrl } }) {
            // Let the middleware handle all protection logic
            return true;
        }
    }
};
}),
"[project]/messages/ar.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"Admin\":{\"nav\":{\"dashboard\":\"نظرة عامة\",\"subjects\":\"إدارة المواد\",\"analytics\":\"تحليلات الأداء\",\"students\":\"دليل الطلاب\",\"settings\":\"إعدادات النظام\",\"logout\":\"خروج\"},\"stats\":{\"total_students\":\"إجمالي الطلاب\",\"total_quizzes\":\"إجمالي الاختبارات\",\"avg_score\":\"متوسط الدرجات\",\"challenging_subject\":\"المادة الأكثر صعوبة\"},\"dashboard\":{\"welcome\":\"مرحباً بعودتك، المسؤول.\",\"performance_index\":\"مؤشر أداء المواد\",\"quick_actions\":\"إجراءات سريعة\",\"manage_subjects\":\"إدارة المواد\",\"student_reports\":\"تقارير الطلاب\"},\"subjects\":{\"title\":\"إدارة المواد\",\"subtitle\":\"إعداد وإدارة المواد التعليمية.\",\"add_new\":\"إضافة مادة جديدة\",\"edit\":\"تعديل المادة\",\"name_en\":\"الاسم (إنجليزي)\",\"name_ar\":\"الاسم (عربي)\",\"desc_en\":\"الوصف (إنجليزي)\",\"desc_ar\":\"الوصف (عربي)\",\"status\":\"الحالة\",\"stats_col\":\"الإحصائيات\",\"actions\":\"الإجراءات\",\"is_enabled\":\"مفعّل\",\"disabled\":\"معطّل\",\"quizzes_count\":\"الاختبارات\",\"submissions_count\":\"التقديمات\",\"save\":\"حفظ التغييرات\",\"cancel\":\"إلغاء\",\"confirm_delete\":\"هل أنت متأكد من حذف هذه المادة؟\"},\"students\":{\"title\":\"دليل الطلاب\",\"subtitle\":\"إدارة وعرض الطلاب المسجلين.\",\"search_placeholder\":\"بحث بالاسم أو البريد الإلكتروني...\",\"col_student\":\"الطالب\",\"col_role\":\"الدور\",\"col_assessments\":\"التقييمات\",\"col_joined\":\"تاريخ الانضمام\"},\"analytics\":{\"title\":\"تحليلات الأداء\",\"subtitle\":\"مراقبة تفاعل الطلاب واتجاهات الأداء.\",\"filters\":{\"student_name\":\"اسم الطالب...\",\"all_subjects\":\"جميع المواد\",\"apply\":\"تطبيق الفلاتر\"},\"table\":{\"student\":\"الطالب\",\"subject\":\"المادة\",\"score\":\"الدرجة\",\"date\":\"التاريخ\",\"details\":\"التفاصيل\"},\"no_results\":\"لا توجد نتائج مطابقة للفلاتر.\"},\"settings\":{\"title\":\"إعدادات النظام\",\"subtitle\":\"إعداد المعلمات العامة للنظام ومراقبة الحالة.\",\"ai_config\":\"إعدادات الذكاء الاصطناعي\",\"active_model\":\"نموذج الذكاء الاصطناعي النشط\",\"failover_note\":\"سيقوم النظام تلقائياً بالتحويل إلى النماذج الاحتياطية إذا تجاوز زمن الاستجابة 3.5 ثانية.\",\"saving\":\"جاري الحفظ...\",\"apply_policies\":\"تطبيق سياسات الذكاء الاصطناعي\",\"system_integrity\":\"سلامة النظام\",\"operational\":\"يعمل\",\"last_scan\":\"آخر فحص\",\"locale_title\":\"اللغة والإعدادات المحلية\",\"default_locale\":\"اللغة الافتراضية\",\"secondary_locale\":\"اللغة الثانوية\",\"rtl_optimization\":\"تحسين RTL\",\"active\":\"نشط\"}},\"Navigation\":{\"home\":\"الرئيسية\",\"diagnostic\":\"التقييم التشخيصي\",\"dashboard\":\"لوحة التحكم\",\"subjects\":\"المواد الدراسية\",\"login\":\"تسجيل الدخول\"},\"Index\":{\"title\":\"FuturePath\",\"description\":\"منصة تعليمية مدعومة بالذكاء الاصطناعي لمسارات التعلم الشخصية.\"},\"Auth\":{\"login\":\"تسجيل الدخول\",\"signup\":\"إنشاء حساب\",\"email\":\"البريد الإلكتروني\",\"password\":\"كلمة المرور\",\"logout\":\"تسجيل الخروج\",\"no_account\":\"ليس لديك حساب؟\",\"have_account\":\"لديك حساب بالفعل؟\",\"login_title\":\"مرحباً بعودتك\",\"description\":\"الوصول إلى مسار التعلم المخصص الخاص بك\",\"signup_title\":\"انضم إلى FuturePath\",\"signup_desc\":\"ابدأ رحلتك التعليمية المستقبلية\",\"student_role\":\"طالب\",\"admin_role\":\"مسؤول\",\"role_select\":\"اختر دورك\"},\"Landing\":{\"title_main\":\"اكتشف رحلتك\",\"title_ai\":\"الأكاديمية المثالية.\",\"badge_new\":\"تعليم الجيل القادم\",\"description\":\"توجيه مدعوم بالذكاء الاصطناعي لإتقان موادك وفتح آفاق مستقبلك.\",\"cta\":\"ابدأ التقييم التشخيصي الخاص بك\",\"cta_desc\":\"دع ذكاؤنا الاصطناعي يفهم نقاط قوتك وضعفك لبناء خارطة طريق دراسية مثالية لك.\",\"begin\":\"ابدأ الآن\",\"coming_soon\":\"قريباً\",\"academic_subjects\":\"المواد الأكاديمية\",\"select_material\":\"اختر مادة لمعاينة التخصصات\",\"future_path_cta\":\"هل أنت مستعد لاكتشاف مسارك المستقبلي؟\",\"diagnostic_title\":\"التقييم التشخيصي\",\"diagnostic_desc\":\"ركز جيداً: يرجى الإجابة على الأسئلة التالية بدقة للحصول على أفضل النتائج.\",\"stats\":{\"precision\":\"دقة 98%\",\"optimized\":\"محسن بالذكاء الاصطناعي\",\"ranked\":\"المرتبة الأولى\"},\"subjects\":{\"math\":\"الرياضيات\",\"physics\":\"الفيزياء\",\"biology\":\"الأحياء\",\"chemistry\":\"الكيمياء\",\"english\":\"اللغة الإنجليزية\",\"specialization\":\"معلومات التخصص جاهزة\",\"active_curriculum\":\"المنهج النشط\",\"math_desc\":\"حساب التفاضل والتكامل المتقدم والجبر والهندسة للتحضير الجامعي.\",\"math_topics\":[\"التفاضل والتكامل\",\"الجبر الخططي\",\"الأعداد المركبة\",\"الهندسة\"],\"physics_desc\":\"الديناميكا الحرارية والميكانيكا وخصائص الموجات في الفيزياء الحديثة.\",\"physics_topics\":[\"الميكانيكا\",\"الكهرباء\",\"الفيزياء النووية\",\"الموجات\"],\"biology_desc\":\"تكاثر الخلايا وعلم الوراثة وديناميكيات النظام البيئي.\",\"biology_topics\":[\"علم الوراثة\",\"البيئة\",\"بنية الخلية\",\"تشريح الإنسان\"],\"chemistry_desc\":\"المركبات العضوية ومعدل التفاعلات والاتزان الكيميائي.\",\"chemistry_topics\":[\"الكيمياء العضوية\",\"الديناميكا الحرارية\",\"الترابط\",\"الحساب الكيميائي\"],\"english_desc\":\"التحليل الأدبي والقواعد المتقدمة والكتابة الأكاديمية.\",\"english_topics\":[\"التحليل\",\"القواعد\",\"التأليف\",\"الشعر\"],\"start_assessment\":\"بدء التقييم\",\"about\":\"حول هذه المادة\",\"curriculum\":\"المنهج الأساسي\"},\"features\":{\"title\":\"ميزات ذكية\",\"subtitle\":\"كل ما تحتاجه للنجاح\",\"roadmap\":{\"title\":\"خرائط طريق ديناميكية\",\"desc\":\"خطط دراسية تم إنشؤها بوساطة الذكاء الاصطناعي تتكيف مع تقدمك.\"},\"analytics_feat\":{\"title\":\"تحليلات عميقة\",\"desc\":\"تصور نموك وحدد الفجوات في الوقت الفعلي.\"},\"predictor_feat\":{\"title\":\"متنبئ التخصص\",\"desc\":\"توصيات جامعية علمية بناءً على أدائك.\"}},\"how_it_works\":{\"title\":\"كيف يعمل FuturePath\",\"subtitle\":\"ثلاث خطوات بسيطة لرحلتك التعليمية المخصصة\",\"step1_title\":\"ابدأ التقييم\",\"step1_desc\":\"أكمل اختباراً تشخيصياً مدعوماً بالذكاء الاصطناعي لتقييم نقاط قوتك وضعفك.\",\"step2_title\":\"احصل على خارطة الطريق\",\"step2_desc\":\"يُنشئ ذكاؤنا الاصطناعي مساراً دراسياً مخصصاً يناسب مستواك الفريد.\",\"step3_title\":\"اكتشف مستقبلك\",\"step3_desc\":\"احصل على توصيات التخصص الجامعي المدعومة بالذكاء الاصطناعي.\"},\"journey\":{\"title\":\"رحلتك التعليمية\",\"subtitle\":\"من أول تقييم إلى جامعة أحلامك\",\"card1_title\":\"تشخيص ذكي\",\"card1_desc\":\"أسئلة مولّدة بالذكاء الاصطناعي تتكيف مع مستواك آنياً.\",\"card2_title\":\"مسارات مخصصة\",\"card2_desc\":\"كل طالب يحصل على خارطة طريق فريدة بناءً على نتائجه.\",\"card3_title\":\"تتبع التقدم\",\"card3_desc\":\"راقب نموك مع تحليلات ورؤى تفصيلية.\",\"card4_title\":\"توجيه مهني\",\"card4_desc\":\"الذكاء الاصطناعي يتنبأ بأفضل تخصص جامعي يناسب قدراتك.\"},\"final_cta\":{\"title\":\"مستعد لتشكيل مستقبلك الأكاديمي؟\",\"desc\":\"انضم لآلاف الطلاب الذين يستخدمون الذكاء الاصطناعي لإتقان موادهم والتخطيط لمسيرتهم المهنية.\",\"button\":\"ابدأ تقييمك\"}},\"Footer\":{\"description\":\"منصة تعليمية مدعومة بالذكاء الاصطناعي تساعد الطلاب على اكتشاف نقاط قوتهم وإتقان موادهم والتخطيط لمستقبلهم الأكاديمي.\",\"platform\":\"المنصة\",\"diagnostic\":\"التقييم التشخيصي\",\"dashboard\":\"لوحة تحكم الطالب\",\"predictor\":\"متنبئ التخصص\",\"resources\":\"المصادر\",\"about\":\"عن FuturePath\",\"features\":\"المميزات\",\"contact\":\"تواصل معنا\",\"privacy\":\"سياسة الخصوصية\",\"copyright\":\"جميع الحقوق محفوظة.\"},\"Language\":{\"switcher\":\"اللغة\"},\"Common\":{\"welcome\":\"مرحباً\",\"loading\":\"جاري التحميل...\",\"na\":\"غير متوفر\"},\"Predictor\":{\"title\":\"متنبئ التخصص الجامعي\",\"description\":\"يقوم الذكاء الاصطناعي لدينا بتحليل مقاييس أدائك لاكتشاف مستقبلك الأكاديمي المثالي.\",\"analyze\":\"تحليل الأداء\",\"calculating\":\"جاري تحليل النتائج...\",\"match_score\":\"درجة المطابقة\",\"careers\":\"المسارات المهنية المحتملة\",\"explanation\":\"لماذا هذا التخصص؟\",\"no_data\":\"نحتاج إلى مزيد من البيانات للتنبؤ بمستقبلك. يرجى إكمال المزيد من الاختبارات التشخيصية!\",\"take_quiz\":\"بدء التشخيص\",\"engine_badge\":\"محرك المستقبل AI\",\"observation_required\":\"مطلوب الملاحظة\",\"subjects_required\":\"يتطلب التنبؤ الوظيفي بيانات من 3 مواد مختلفة على الأقل.\",\"last_updated\":\"آخر تحديث\",\"refresh_btn\":\"تحديث تحليل الذكاء الاصطناعي\",\"rerun_btn\":\"إعادة التحليل\"},\"Profile\":{\"title\":\"ملفك الشخصي\",\"history\":\"سجل التقييمات\",\"no_history\":\"لا توجد تقييمات بعد.\",\"no_assessments\":\"لا توجد تقييمات بعد.\",\"edit\":\"تعديل الملف\",\"logout\":\"تسجيل الخروج\",\"view_path\":\"عرض المسار\",\"details\":\"تفاصيل الحساب\",\"name\":\"الاسم الكامل\",\"email\":\"البريد الإلكتروني\",\"role\":\"الدور\",\"stats_total\":\"الإجمالي\",\"start_quiz_cta\":\"ابدأ أول اختبار\",\"student_fallback\":\"طالب\",\"view_details\":\"عرض النتائج\",\"view_roadmap\":\"عرض الخارطة\",\"score_label\":\"الدرجة\",\"no_roadmap\":\"لا يوجد خارطة\",\"settings\":\"إعدادات الحساب\",\"admin_info_title\":\"حساب المسؤول\",\"admin_info_desc\":\"لقد قمت بتسجيل الدخول بصلاحيات إدارية. يرجى استخدام بوابة المسؤول لإدارة بيانات المنصة والطلاب وإعدادات النظام.\",\"back_to_admin\":\"الانتقال إلى بوابة المسؤول\"},\"Dashboard\":{\"welcome_back\":\"مرحباً بعودتك\",\"active_paths\":\"مسارات التعلم النشطة\",\"continue_path\":\"متابعة المسار\",\"no_active_paths\":\"لا توجد مسارات نشطة بعد\",\"no_active_paths_desc\":\"أكمل اختباراً تشخيصياً لإنشاء أول خارطة طريق دراسية مدعومة بالذكاء الاصطناعي.\",\"take_diagnostic\":\"بدء التقييم\",\"major_predictor_title\":\"متنبئ التخصص\",\"major_predictor_desc\":\"دع الذكاء الاصطناعي يحلل أداءك العام لاكتشاف أفضل تخصص جامعي لك.\",\"progress_to_unlock\":\"التقدم لفتح الميزة\",\"open_predictor\":\"فتح متنبئ الذكاء الاصطناعي\",\"assessment_history\":\"سجل التقييمات\"},\"Results\":{\"title\":\"نتائج التقييم\",\"complete_badge\":\"اكتمل التقييم\",\"score_label\":\"الدرجة\",\"excellent_msg\":\"عمل رائع! لديك فهم قوي للأساسيات. ستتركز خارطة الطريق الخاصة بك على التطبيق المتقدم.\",\"good_msg\":\"بداية جيدة! لقد حددنا بعض الفجوات المعرفية. ستعمل خارطة الطريق المخصصة لك على تقوية أساسياتك.\",\"view_path\":\"عرض مساري في FuturePath\",\"try_another\":\"تجربة مادة أخرى\",\"breakdown\":\"تفاصيل الأسئلة\",\"correct\":\"صحيح\",\"incorrect\":\"خطأ\"},\"Diagnostic\":{\"title\":\"قياس\",\"generating\":\"جاري تحضير الأسئلة...\",\"subject_label\":\"المادة\",\"of_questions\":\"من {total} أسئلة\",\"subjects_count\":\"{current} / {total} مواد\",\"excellent_job\":\"رائع! تم إكمال المادة\",\"ready_for_next\":\"أنت مستعد للمادة التالية\",\"next_subject_btn\":\"المادة التالية\",\"awesome_complete\":\"تهانينا! اكتمل التقييم\",\"analyzing_results_desc\":\"يقوم ذكاؤنا الاصطناعي الآن بتحليل نتائجك لإنشاء مسارك في FuturePath\",\"analyzing_results_btn\":\"جاري تحليل النتائج...\",\"view_path_btn\":\"إنشاء مساري في FuturePath\",\"view_results_btn\":\"عرض النتائج فقط\",\"stage_1_badge\":\"الخطوة الأولى: التقييم\",\"selection_title\":\"اختر مادتك\",\"selection_desc\":\"اختر مادة لبدء التقييم التشخيصي وفتح خارطة الطريق المدعومة بالذكاء الاصطناعي.\",\"start_btn\":\"ابدأ التقييم\",\"restricted_title\":\"الوصول مقيد\",\"restricted_desc\":\"لا يمكن للمسؤولين إجراء الاختبارات التشخيصية.\",\"restricted_back\":\"العودة إلى بوابة المسؤول\"}}"));}),
"[project]/messages/en.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"Navigation\":{\"home\":\"Home\",\"diagnostic\":\"Diagnostic\",\"dashboard\":\"Dashboard\",\"subjects\":\"Subjects\",\"login\":\"Login\"},\"Index\":{\"title\":\"FuturePath\",\"description\":\"AI-powered educational platform for personalized learning paths.\"},\"Auth\":{\"login\":\"Login\",\"signup\":\"Sign Up\",\"email\":\"Email Address\",\"password\":\"Password\",\"logout\":\"Logout\",\"no_account\":\"Don't have an account?\",\"have_account\":\"Already have an account?\",\"login_title\":\"Welcome Back\",\"description\":\"Access your personalized learning path\",\"signup_title\":\"Join FuturePath\",\"signup_desc\":\"Begin your futuristic learning journey\",\"student_role\":\"Student\",\"admin_role\":\"Administrator\",\"role_select\":\"Select your Role\"},\"Landing\":{\"title_main\":\"Discover your Perfect\",\"title_ai\":\"Academic Journey.\",\"badge_new\":\"Next-Gen Education\",\"description\":\"AI-powered guidance to master your subjects and unlock your future.\",\"cta\":\"Start Your Diagnostic Assessment\",\"cta_desc\":\"Let our AI understand your strengths and weaknesses to build your perfect study roadmap.\",\"begin\":\"Begin Now\",\"coming_soon\":\"Coming Soon\",\"academic_subjects\":\"Academic Subjects\",\"select_material\":\"Select a material to preview specializations\",\"future_path_cta\":\"Ready to discover your future path?\",\"diagnostic_title\":\"Diagnostic Assessment\",\"diagnostic_desc\":\"Focus Mode: Please complete the following questions as accurately as possible to build your roadmap.\",\"stats\":{\"precision\":\"98% Precision\",\"optimized\":\"AI Optimized\",\"ranked\":\"Ranked #1\"},\"subjects\":{\"math\":\"Math\",\"physics\":\"Physics\",\"biology\":\"Biology\",\"chemistry\":\"Chemistry\",\"english\":\"English\",\"specialization\":\"Specialization info ready\",\"active_curriculum\":\"Active Curriculum\",\"math_desc\":\"Advanced calculus, algebra, and geometry for university preparation.\",\"math_topics\":[\"Calculus\",\"Linear Algebra\",\"Complex Numbers\",\"Geometry\"],\"physics_desc\":\"Thermodynamics, mechanics, and wave properties in modern physics.\",\"physics_topics\":[\"Mechanics\",\"Electricity\",\"Nuclear Physics\",\"Waves\"],\"biology_desc\":\"Cell reproduction, genetics, and ecosystem dynamics.\",\"biology_topics\":[\"Genetics\",\"Ecology\",\"Cell Structure\",\"Human Anatomy\"],\"chemistry_desc\":\"Organic compounds, rate of reactions, and chemical equilibrium.\",\"chemistry_topics\":[\"Organic Chemistry\",\"Thermodynamics\",\"Bonding\",\"Stoichiometry\"],\"english_desc\":\"Literary analysis, advanced grammar, and academic writing.\",\"english_topics\":[\"Analysis\",\"Grammar\",\"Composition\",\"Poetry\"],\"start_assessment\":\"Start Assessment\",\"about\":\"About this Subject\",\"curriculum\":\"Core Curriculum\"},\"features\":{\"title\":\"Future Features\",\"subtitle\":\"Everything you need to succeed\",\"roadmap\":{\"title\":\"Dynamic Roadmaps\",\"desc\":\"AI-generated study plans that adapt to your progress.\"},\"analytics_feat\":{\"title\":\"Deep Analytics\",\"desc\":\"Visualize your growth and identify gaps in real-time.\"},\"predictor_feat\":{\"title\":\"Major Predictor\",\"desc\":\"Scientific university recommendations based on your performance.\"}},\"how_it_works\":{\"title\":\"How FuturePath Works\",\"subtitle\":\"Three simple steps to your personalized learning journey\",\"step1_title\":\"Take Assessment\",\"step1_desc\":\"Complete an AI-driven diagnostic quiz to evaluate your strengths and weaknesses across subjects.\",\"step2_title\":\"Get Your Roadmap\",\"step2_desc\":\"Our AI generates a personalized study path tailored to your unique learning profile.\",\"step3_title\":\"Discover Your Future\",\"step3_desc\":\"Receive AI-powered university major recommendations based on your academic performance.\"},\"journey\":{\"title\":\"Your Student Journey\",\"subtitle\":\"From first assessment to your dream university\",\"card1_title\":\"Smart Diagnostics\",\"card1_desc\":\"AI-generated questions adapt to your level in real-time.\",\"card2_title\":\"Personalized Paths\",\"card2_desc\":\"Every student gets a unique roadmap based on their results.\",\"card3_title\":\"Track Progress\",\"card3_desc\":\"Monitor your growth with detailed analytics and insights.\",\"card4_title\":\"Career Guidance\",\"card4_desc\":\"AI predicts the best university major for your strengths.\"},\"final_cta\":{\"title\":\"Ready to shape your academic future?\",\"desc\":\"Join thousands of students already using AI to master their subjects and plan their careers.\",\"button\":\"Start Your Assessment\"}},\"Footer\":{\"description\":\"An AI-powered educational platform that helps students discover their strengths, master their subjects, and plan their academic future.\",\"platform\":\"Platform\",\"diagnostic\":\"Diagnostic Assessment\",\"dashboard\":\"Student Dashboard\",\"predictor\":\"Major Predictor\",\"resources\":\"Resources\",\"about\":\"About FuturePath\",\"features\":\"Features\",\"contact\":\"Contact Us\",\"privacy\":\"Privacy Policy\",\"copyright\":\"All rights reserved.\"},\"Admin\":{\"nav\":{\"dashboard\":\"Overview\",\"subjects\":\"Manage Subjects\",\"analytics\":\"Performance Analytics\",\"students\":\"Student Directory\",\"settings\":\"System Settings\",\"logout\":\"Logout\"},\"stats\":{\"total_students\":\"Total Students\",\"total_quizzes\":\"Total Assessments\",\"avg_score\":\"Average Score\",\"challenging_subject\":\"Most Challenging Subject\"},\"dashboard\":{\"welcome\":\"Welcome back, Administrator.\",\"performance_index\":\"Subject Performance Index\",\"quick_actions\":\"Quick Actions\",\"manage_subjects\":\"Manage Subjects\",\"student_reports\":\"Student Reports\"},\"subjects\":{\"title\":\"Subject Management\",\"subtitle\":\"Configure and manage global educational subjects.\",\"add_new\":\"Add New Subject\",\"edit\":\"Edit Subject\",\"name_en\":\"Name (English)\",\"name_ar\":\"Name (Arabic)\",\"desc_en\":\"Description (English)\",\"desc_ar\":\"Description (Arabic)\",\"status\":\"Status\",\"stats_col\":\"Stats\",\"actions\":\"Actions\",\"is_enabled\":\"Enabled\",\"disabled\":\"Disabled\",\"quizzes_count\":\"Quizzes\",\"submissions_count\":\"Submissions\",\"save\":\"Save Changes\",\"cancel\":\"Cancel\",\"confirm_delete\":\"Are you sure you want to delete this subject?\"},\"students\":{\"title\":\"Student Directory\",\"subtitle\":\"Manage and view registered students.\",\"search_placeholder\":\"Search by name or email...\",\"col_student\":\"Student\",\"col_role\":\"Role\",\"col_assessments\":\"Assessments\",\"col_joined\":\"Joined\"},\"analytics\":{\"title\":\"Performance Analytics\",\"subtitle\":\"Monitor student engagement and performance trends.\",\"filters\":{\"student_name\":\"Student name...\",\"all_subjects\":\"All Subjects\",\"apply\":\"Apply Filters\"},\"table\":{\"student\":\"Student\",\"subject\":\"Subject\",\"score\":\"Score\",\"date\":\"Date\",\"details\":\"Details\"},\"no_results\":\"No results matching your filters.\"},\"settings\":{\"title\":\"System Settings\",\"subtitle\":\"Configure global system parameters and monitor health.\",\"ai_config\":\"AI Configuration\",\"active_model\":\"Active Intelligence Model\",\"failover_note\":\"System will automatically failover to fallback models if primary latency exceeds 3.5s.\",\"saving\":\"Saving...\",\"apply_policies\":\"Apply AI Policies\",\"system_integrity\":\"System Integrity\",\"operational\":\"Operational\",\"last_scan\":\"Last scan\",\"locale_title\":\"Global Language & Locale\",\"default_locale\":\"Default Locale\",\"secondary_locale\":\"Secondary Locale\",\"rtl_optimization\":\"RTL Optimization\",\"active\":\"Active\"},\"analytics_detail\":{\"title\":\"Submission Analysis\",\"student_info\":\"Student Information\",\"performance\":\"Performance\",\"ai_analysis\":\"AI Assessment\",\"roadmap\":\"Learning Roadmap\",\"recommendations\":\"Recommendations\",\"summary\":\"Summary\",\"back\":\"Back to Analytics\",\"not_found\":\"Submission not found\"}},\"Language\":{\"switcher\":\"Language\"},\"Common\":{\"welcome\":\"Welcome\",\"loading\":\"Loading...\",\"na\":\"N/A\"},\"Predictor\":{\"title\":\"University Major Predictor\",\"description\":\"Our AI analyzes your performance metrics to discover your ideal academic future.\",\"analyze\":\"Analyze Performance\",\"calculating\":\"Analyzing Results...\",\"match_score\":\"Match Score\",\"careers\":\"Potential Career Paths\",\"explanation\":\"Why this major?\",\"no_data\":\"We need more data to predict your future. Please complete more diagnostic quizzes!\",\"take_quiz\":\"Start Diagnostic\",\"engine_badge\":\"AI Future Engine\",\"observation_required\":\"Observation Required\",\"subjects_required\":\"Career prediction requires data from at least 3 different subjects.\",\"last_updated\":\"Last Updated\",\"refresh_btn\":\"Refresh AI Analysis\",\"rerun_btn\":\"Rerun Analysis\"},\"Profile\":{\"title\":\"Your Profile\",\"history\":\"Assessment History\",\"no_history\":\"No assessments yet.\",\"no_assessments\":\"No assessments yet.\",\"edit\":\"Edit Profile\",\"logout\":\"Logout\",\"view_path\":\"View Path\",\"details\":\"Account Details\",\"name\":\"Full Name\",\"email\":\"Email Address\",\"role\":\"Role\",\"stats_total\":\"Total\",\"start_quiz_cta\":\"Start First Quiz\",\"student_fallback\":\"Student\",\"view_details\":\"View Results\",\"view_roadmap\":\"View Roadmap\",\"score_label\":\"Score\",\"no_roadmap\":\"No Roadmap\",\"settings\":\"Account Settings\",\"admin_info_title\":\"Administrator Account\",\"admin_info_desc\":\"You are logged in with administrative privileges. Please use the Admin Portal to manage the platform's data, students, and system settings.\",\"back_to_admin\":\"Go to Admin Portal\"},\"Dashboard\":{\"welcome_back\":\"Welcome back\",\"active_paths\":\"Active Learning Paths\",\"continue_path\":\"Continue Path\",\"no_active_paths\":\"No active paths yet\",\"no_active_paths_desc\":\"Complete a diagnostic quiz to generate your first AI-powered roadmap.\",\"take_diagnostic\":\"Take Diagnostic\",\"major_predictor_title\":\"Major Predictor\",\"major_predictor_desc\":\"Let AI analyze your overall performance to discover the best university major for you.\",\"progress_to_unlock\":\"Progress to Unlock\",\"open_predictor\":\"Open AI Predictor\",\"assessment_history\":\"Assessment History\"},\"Results\":{\"title\":\"Assessment Results\",\"complete_badge\":\"Assessment Complete\",\"score_label\":\"Score\",\"excellent_msg\":\"Excellent work! You have a strong grasp of the fundamentals. Your roadmap will focus on advanced application.\",\"good_msg\":\"A good start! We've identified some knowledge gaps. Your personalized roadmap will strengthen your foundations.\",\"view_path\":\"View My FuturePath\",\"try_another\":\"Try Another Subject\",\"breakdown\":\"Question Breakdown\",\"correct\":\"Correct\",\"incorrect\":\"Incorrect\"},\"Diagnostic\":{\"title\":\"Diagnostic\",\"generating\":\"Generating your questions...\",\"subject_label\":\"Subject\",\"of_questions\":\"of {total} Questions\",\"subjects_count\":\"{current} / {total} Subjects\",\"excellent_job\":\"Great Job! Subject Completed\",\"ready_for_next\":\"You're ready for the next subject\",\"next_subject_btn\":\"Continue to Next Subject\",\"awesome_complete\":\"Awesome! Assessment Complete\",\"analyzing_results_desc\":\"Our AI is analyzing your performance to generate your unique FuturePath.\",\"analyzing_results_btn\":\"Analyzing Results...\",\"view_path_btn\":\"Generate My FuturePath\",\"view_results_btn\":\"View Results Only\",\"stage_1_badge\":\"Step 1: Evaluation\",\"selection_title\":\"Choose Your Subject\",\"selection_desc\":\"Select a subject to begin your diagnostic assessment and unlock your AI-powered roadmap.\",\"start_btn\":\"Start Assessment\",\"restricted_title\":\"Access Restricted\",\"restricted_desc\":\"Administrators cannot take diagnostic quizzes.\",\"restricted_back\":\"Back to Admin Portal\"}}"));}),
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next-auth/index.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/auth.config.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$navigation$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/navigation.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
;
;
;
;
const intlMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])({
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$navigation$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["routing"],
    defaultLocale: "en"
});
// Use auth.config (edge-compatible, no Prisma) instead of auth.ts
const { auth } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"]);
const __TURBOPACK__default__export__ = auth((req)=>{
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    // Run intl-middleware first to detect/set locale
    const response = intlMiddleware(req);
    // Extract locale from the URL
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

//# sourceMappingURL=%5Broot-of-the-server%5D__b0b3a9bf._.js.map