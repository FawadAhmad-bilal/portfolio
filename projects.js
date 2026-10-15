// ADD A PROJECT: copy one block, paste it at the end of the list, and edit it.
// cats = list of categories. Use any of: "Featured", "Deployed", "Deep learning", "Research", "Client"
// A project can be in several categories, for example cats: ["Deployed", "Deep learning"]
// repo = name of the GitHub repository (leave "" if none). demo = live app link (leave "" if none).
const GITHUB = "https://github.com/FawadAhmad-bilal/";

const projects = [
  { title: "Multi-Agent Forex Decision-Support System", cats: ["Featured"],
    text: "Four cooperating agents (Data, Technical, Risk, Decision) turn market data into a risk-aware decision.",
    note: "Walk-forward backtester, Streamlit dashboard, MT5 integration.",
    tags: ["Python", "Agents", "Streamlit"], repo: "", demo: "" }, // TODO: add repo name

  { title: "FlyRank AI: Content Decline-Risk and Action Playbook", cats: ["Featured"],
    text: "A Random Forest decline-risk score and 4 K-Means content types, turned into a prioritised action queue.",
    note: "Audited for split leakage: precision@20 fell from 0.900 (random split) to 0.550 (client-grouped split).",
    tags: ["scikit-learn", "Random Forest", "K-Means"], repo: "", demo: "" },

  { title: "Multi-Organ Diagnostic Suite", cats: ["Featured", "Deployed", "Deep learning"],
    text: "Five transfer-learning models in one app: chest X-ray (ResNet50), malaria (MobileNetV2), skin cancer (EfficientNet), brain tumor (VGG16), diabetic retinopathy (ResNet50).",
    note: "Educational demo.",
    tags: ["TensorFlow", "Transfer learning", "Streamlit"], repo: "multi-organ-diagnostic-suit", demo: "" },

  { title: "Unified Face Analysis Suite", cats: ["Featured", "Deep learning"],
    text: "Age and gender estimation, emotion detection, and face recognition in one Streamlit pipeline.",
    note: "Combines three separate models.",
    tags: ["OpenCV", "TensorFlow", "Streamlit"], repo: "", demo: "" },

  { title: "KP Heritage3D", cats: ["Research"],
    text: "3D reconstruction of the archaeological site Takht-i-Bahi from video frames.",
    note: "Research in progress.",
    tags: ["Computer vision", "3D reconstruction"], repo: "", demo: "" },

  // { title: "Adaptive LSB Steganography", cats: ["Research"],
  //   text: "Adaptive least-significant-bit image steganography, implemented in MATLAB.",
  //   note: "Thesis-style study.",
  //   tags: ["MATLAB", "Image processing"], repo: "", demo: "" },

  { title: "PneumoScan", cats: ["Deployed", "Deep learning"],
    text: "Chest X-ray pneumonia detection with a custom 13-layer CNN.",
    note: "About 81.7% test accuracy. Educational demo.",
    tags: ["CNN", "TensorFlow", "Streamlit"], repo: "chest-x-ray-pneumonia-detector", demo: "" },

  { title: "Research Assistant Chatbot", cats: ["Deployed"],
    text: "A LangChain-powered research assistant chatbot.",
    note: "Built with LangChain.",
    tags: ["LangChain", "Streamlit"], repo: "research_assistent_chatbot_opensources", demo: "" },

  { title: "YouTube RAG Chatbot", cats: ["Deployed"],
    text: "Ask questions about a YouTube video using retrieval-augmented generation.",
    note: "",
    tags: ["RAG", "LangChain", "Streamlit"], repo: "youtube-rag-chatbot", demo: "" },

  { title: "Breast Cancer Predictor", cats: ["Deployed"],
    text: "Deployed web app for breast cancer prediction.",
    note: "About 97% accuracy. Educational demo.",
    tags: ["scikit-learn", "Streamlit"], repo: "", demo: "" },

  { title: "Titanic Survival Predictor", cats: ["Deployed"],
    text: "An SVM classifier in a deployed web app.",
    note: "82% accuracy.",
    tags: ["SVM", "Streamlit"], repo: "titanic-survival-prediction-using-svm__streamlit", demo: "" },

  { title: "Heart Disease and Penguin Species Predictors", cats: ["Deployed"],
    text: "Two AdaBoost classifiers, each in its own deployed web app.",
    note: "",
    tags: ["AdaBoost", "Streamlit"], repo: "heart-disease-predictor-adaboost", demo: "" },

  { title: "Diamond Price Predictor", cats: ["Deployed"],
    text: "Polynomial regression for diamond prices.",
    note: "R² = 0.859.",
    tags: ["Regression", "scikit-learn"], repo: "", demo: "" },

  { title: "Facial Emotion Detection", cats: ["Deep learning"],
    text: "A CNN built from scratch on FER2013.",
    note: "About 59% validation accuracy, in line with published benchmarks for this dataset.",
    tags: ["CNN", "FER2013"], repo: "", demo: "" },

  { title: "Backpropagation from Scratch", cats: ["Deep learning"],
    text: "The algorithm implemented directly, with no high-level deep learning framework.",
    note: "",
    tags: ["Python", "NumPy"], repo: "", demo: "" },

  { title: "Face Recognition (Siamese Network)", cats: ["Deep learning"],
    text: "Trained with triplet loss on the LFW dataset.",
    note: "",
    tags: ["Siamese", "Triplet loss"], repo: "", demo: "" },

  { title: "Age and Gender Detection", cats: ["Deep learning"],
    text: "MobileNetV2 transfer learning on UTKFace.",
    note: "",
    tags: ["MobileNetV2", "UTKFace"], repo: "", demo: "" },

  { title: "Fake News Detection (RNN)", cats: ["Deep learning"],
    text: "A SimpleRNN with an embedding layer.",
    note: "About 98.99% validation accuracy.",
    tags: ["RNN", "NLP"], repo: "", demo: "" },

  { title: "Fatima Nursing College Management System", cats: ["Client"],
    text: "A live student, fee, and attendance system for a real nursing college.",
    note: "In daily use.",
    tags: ["Firebase", "Web app"], repo: "", demo: "" },

  { title: "Payment Tracker", cats: ["Client"],
    text: "A live payment logging tool for a family business.",
    note: "In daily use.",
    tags: ["Firebase", "Web app"], repo: "", demo: "" }
];
